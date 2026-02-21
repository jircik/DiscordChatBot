require("dotenv").config();

const { Client, GatewayIntentBits } = require("discord.js");
const axios = require("axios");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.once("ready", () => {
    console.log(`Bot online como ${client.user.tag}`);
});

// Função para chamar a Groq
async function askGroq(message) {
    try {
        const response = await axios.post(
            "https://api.groq.com/openai/v1/chat/completions",
            {
                model: "llama-3.1-8b-instant",
                messages: [
                    {
                        role: "system",
                        content: "You are a helpful Discord assistant."
                    },
                    {
                        role: "user",
                        content: message
                    }
                ],
                temperature: 0.7
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );

        return response.data.choices[0].message.content;
    } catch (error) {
        console.error(error.response?.data || error.message);
        return "Erro ao comunicar com a IA.";
    }
}

client.on("messageCreate", async (message) => {
    if (message.author.bot) return;
    if (!message.content.startsWith("!gpt")) return;

    const prompt = message.content.replace("!gpt", "").trim();

    if (!prompt) {
        return message.reply("Digite algo após !gpt");
    }

    try {
        await message.channel.sendTyping();

        const reply = await askGroq(prompt);

        await message.reply(reply);
    } catch (error) {
        console.error(error);
        message.reply("Erro ao processar sua solicitação.");
    }
});

client.login(process.env.DISCORD_TOKEN);