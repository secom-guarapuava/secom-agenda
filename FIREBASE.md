# Ativar a nuvem (Firebase) — dados compartilhados em tempo real

Hoje o app já funciona salvando os dados **no aparelho**. Seguindo os passos
abaixo, ele passa a salvar **na nuvem** e tudo que uma pessoa alterar aparece
**na hora para toda a equipe** — sem login (entrada anônima automática).

> Você só precisa fazer isto **uma vez**. Depois é só usar.

---

## Passo a passo (±10 min)

### 1. Criar o projeto
1. Acesse **https://console.firebase.google.com** e entre com sua conta Google.
2. Clique em **Adicionar projeto** → dê um nome (ex.: `central-secom`) → avançar
   até **Criar projeto**. (Pode desligar o Google Analytics, não é necessário.)

### 2. Registrar o app Web
1. Na tela do projeto, clique no ícone **`</>`** (Web).
2. Dê um apelido (ex.: `central`) e clique em **Registrar app**.
3. Vai aparecer um trecho de código com um bloco `firebaseConfig = { ... }`.
   **Copie os valores** (apiKey, authDomain, projectId, etc.).

### 3. Colar as chaves no projeto
Abra o arquivo **`src/lib/firebaseConfig.ts`** e cole os valores entre as aspas:

```ts
export const FIREBASE_CONFIG = {
  apiKey: "AIza...",
  authDomain: "central-secom.firebaseapp.com",
  projectId: "central-secom",
  storageBucket: "central-secom.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123...:web:abc...",
};
```

> Pode colar sem medo: a chave Web do Firebase **não é secreta**. A segurança
> vem das Regras (passo 5) + login anônimo.

### 4. Ligar o login anônimo
1. No menu à esquerda: **Criação → Authentication → Vamos começar**.
2. Aba **Sign-in method** → na lista, escolha **Anônimo** → **Ativar** → Salvar.

### 5. Criar o banco (Firestore) e as regras
1. Menu **Criação → Firestore Database → Criar banco de dados**.
2. Escolha **modo de produção** e a região **`southamerica-east1` (São Paulo)** →
   Ativar.
3. Abra a aba **Regras**, apague o que estiver lá e cole exatamente isto, depois
   clique em **Publicar**:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /secom/{documento} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### 6. Publicar
Suba as alterações para o GitHub (push). O GitHub Actions reconstrói o app e,
a partir daí, os dados passam a sincronizar para todo mundo. 🎉

---

## Como testar
Abra o app em **dois aparelhos** (ou duas abas). Crie ou mude o status de uma
agenda em um — em segundos ela muda no outro, sozinha.

## Bom saber
- **Espaço único compartilhado:** todos veem e editam as mesmas agendas, equipe
  e plantão. Na primeiríssima vez, o app cria os dados de exemplo automaticamente
  (você pode editar/excluir à vontade).
- **Dados que estavam só no aparelho não migram sozinhos.** Depois de ativar a
  nuvem, basta recadastrar (ou editar) uma vez — a partir daí fica salvo para todos.
- **Funciona offline:** se a internet cair, o app continua usando a última versão
  baixada e sincroniza quando voltar.
- **Desativar a nuvem:** é só apagar os valores de `firebaseConfig.ts` — o app
  volta a salvar só no aparelho.
- **Custo:** o plano gratuito (Spark) do Firebase atende tranquilamente uma
  equipe desse tamanho.

## E se eu quiser exigir senha no futuro?
A estrutura já está pronta para isso. Dá para trocar o login anônimo por uma
senha única da equipe (ou conta por pessoa) mexendo só no login e nas Regras —
me chame quando quiser fazer essa evolução.
