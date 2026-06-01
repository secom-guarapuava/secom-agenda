"use client";

import { useState } from "react";
import { LayoutGroup } from "framer-motion";
import { useDB } from "@/lib/store";
import AgendaCard from "@/components/AgendaCard";
import { tocarAudio } from "@/lib/voz";
import { GRUPOS, STATUS } from "@/lib/status";
import type { TipoAgenda } from "@/lib/types";

type Filtro = "todas" | TipoAgenda;

const FILTROS: { chave: Filtro; label: string }[] = [
  { chave: "todas", label: "Todas" },
  { chave: "prefeito", label: "👑 Prefeito" },
  { chave: "prefeitura", label: "Prefeitura" },
];

export default function Agendas() {
  const db = useDB();
  const [filtro, setFiltro] = useState<Filtro>("todas");

  const porTipo = db.agendas.filter((a) => (filtro === "todas" ? true : a.tipo === filtro));
  const total = porTipo.length;

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h1 className="text-[22px] font-bold text-ink">Agendas</h1>
        <button onClick={() => tocarAudio()}
          className="flex items-center gap-1.5 text-[11.5px] font-medium text-brand-600 bg-brand-50 rounded-full px-3 py-1.5 active:scale-95 transition">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5 6 9H2v6h4l5 4V5zM15.5 8.5a5 5 0 0 1 0 7M19 5a9 9 0 0 1 0 14" /></svg>
          Ouvir
        </button>
      </div>

      <div className="flex gap-2 mb-2 overflow-x-auto no-scrollbar">
        {FILTROS.map((f) => (
          <button key={f.chave} onClick={() => setFiltro(f.chave)}
            className={`whitespace-nowrap text-[12.5px] font-medium px-3.5 py-1.5 rounded-full border transition active:scale-95 ${filtro === f.chave ? "bg-navy text-white border-navy shadow-card" : "border-slate-200 text-muted bg-white"}`}>
            {f.label}
          </button>
        ))}
      </div>

      {total === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center text-muted text-sm mt-4 shadow-card">
          Nenhuma agenda aqui ainda.<br />Toque no botão <span className="text-brand font-semibold">+</span> para adicionar.
        </div>
      ) : (
        <LayoutGroup>
          {GRUPOS.map((g) => {
            const itens = porTipo
              .filter((a) => a.status === g.chave)
              .sort((a, b) => a.horaInicio.localeCompare(b.horaInicio));
            if (itens.length === 0) return null;
            return (
              <section key={g.chave}>
                <div className="flex items-center gap-2 mt-5 mb-2.5">
                  <span className={`w-2 h-2 rounded-full ${STATUS[g.chave].dot} ${g.chave === "em_andamento" ? "animate-pulseLive" : ""}`} />
                  <h2 className="text-[13px] font-bold text-ink uppercase tracking-wide">{g.titulo}</h2>
                  <span className="text-[11px] font-semibold text-muted bg-white border border-slate-200 rounded-full px-2 py-0.5 min-w-[22px] text-center">{itens.length}</span>
                </div>
                {itens.map((a, i) => <AgendaCard key={a.id} agenda={a} equipe={db.equipe} index={i} />)}
              </section>
            );
          })}
        </LayoutGroup>
      )}
    </div>
  );
}
