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
    console.log(`🤖 Bot online como ${client.user.tag}`);
});

async function askGroq(messageContent) {
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
                        content: messageContent
                    }
                ],
                temperature: 0.7
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
                    "Content-Type": "application/json"
                },
                timeout: 60000
            }
        );

        return response.data.choices[0].message.content;

    } catch (error) {
        console.error("❌ GROQ ERROR:", error.response?.data || error.message);
        throw new Error("Erro ao comunicar com a IA.");
    }
}

client.on("messageCreate", async (message) => {
    if (message.author.bot) return;

    if (!message.channel.parent || message.channel.parent.name !== "GPT") return;

    if (!message.content || message.content.length < 1) return;

    if (message.content.length > 2000) {
        return message.reply("Mensagem muito longa.");
    }

    try {
        await message.channel.sendTyping();

        const reply = await askGroq(message.content);

        const maxLength = 1900;

        if (reply.length > maxLength) {
            const chunks = reply.match(new RegExp(`.{1,${maxLength}}`, "g"));
            for (const chunk of chunks) {
                await message.channel.send(chunk);
            }
        } else {
            await message.reply(reply);
        }

    } catch (error) {
        console.error("❌ BOT ERROR:", error.message);
        message.reply("Erro ao processar sua solicitação.");
    }
});

client.login(process.env.DISCORD_TOKEN);