# 🤖 Discord ChatBot

Bot de Discord com Inteligência Artificial integrado à **Groq API (Llama 3.1)**, desenvolvido com **Node.js** e **discord.js**.

O bot permite criar canais dedicados para conversas com IA dentro de uma categoria chamada `GPT`, oferecendo uma experiência organizada e similar ao ChatGPT diretamente no Discord.

Caso deseje adicionar o bot em seu servidor do discord use esse link:
```bash
https://discord.com/oauth2/authorize?client_id=1474823195235451042&permissions=8&integration_type=0&scope=bot
```

---

## 🚀 Funcionalidades

- 💬 Respostas com IA usando Groq (llama-3.1-8b-instant)
- 📂 Funciona automaticamente dentro de uma categoria chamada `GPT`
- ☁️ Hospedado 24/7 na nuvem (Railway)
- 🔐 Uso seguro de variáveis de ambiente
- 🔄 Deploy automático via GitHub
- ⚡ Alta velocidade e baixa latência

---

## 🏗️ Arquitetura

```
Usuário envia mensagem
        ↓
Discord Gateway
        ↓
Bot (Railway - Node.js)
        ↓
Groq API (Llama 3.1)
        ↓
Resposta da IA
        ↓
Mensagem no Discord
```

O bot responde apenas em canais que estejam dentro de uma categoria chamada:

```
GPT
```

Isso permite que qualquer servidor organize múltiplos canais de conversa com IA.

---

## 🛠️ Tecnologias Utilizadas

- Node.js
- discord.js v14
- Axios
- Groq API
- Railway (Deploy em nuvem)

---

## 🔧 Instalação (Ambiente de Desenvolvimento)

### 1️⃣ Clonar o repositório

```bash
git clone https://github.com/jircik/DiscordChatBot.git
cd DiscordChatBot
```

### 2️⃣ Instalar dependências

```bash
npm install
```

### 3️⃣ Criar arquivo `.env`

Crie um arquivo `.env` na raiz do projeto:

```
DISCORD_TOKEN=seu_token_do_discord
GROQ_API_KEY=sua_api_key_da_groq
```

### 4️⃣ Rodar o bot

```bash
npm start
```

---

## 🧠 Como Funciona

1. O bot escuta novas mensagens.
2. Verifica se o canal pertence à categoria `GPT`.
3. Envia o conteúdo da mensagem para a Groq API.
4. Retorna a resposta gerada pela IA no canal.

---

## 👨‍💻 Autor

Arthur Jircik Cronemberger  
Estudante de Engenharia de Software    

---

## 📄 Licença

ISC License
