// ============================================================
//  CONFIGURAÇÃO DO FIREBASE  (preencher para ativar a nuvem)
// ============================================================
//
// Enquanto os campos estiverem vazios, o app funciona normalmente
// salvando os dados SÓ no aparelho (como hoje). Assim que você colar
// as chaves do seu projeto, o app passa a salvar na nuvem e sincroniza
// em tempo real para TODA a equipe.
//
// Onde pegar: console.firebase.google.com → seu projeto →
// ⚙️ Configurações do projeto → "Seus apps" → app Web → "Configuração".
//
// Pode colar estes valores aqui sem medo: a chave de API Web do Firebase
// NÃO é secreta. A segurança vem das Regras do Firestore + login anônimo.
// (Passo a passo completo no arquivo FIREBASE.md)

export const FIREBASE_CONFIG = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
};
