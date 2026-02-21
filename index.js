require("dotenv").config()
const { Client, GatewayIntentBits } = require("discord.js")
const axios = require("axios")

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
})

client.once("ready", () => {
    console.log(`Bot online como ${client.user.tag}`)
})

client.on("messageCreate", async (message) => {
    if (message.author.bot) return
    if (!message.content.startsWith("!gpt")) return

    const prompt = message.content.replace("!gpt", "").trim()

    if (!prompt) {
        return message.reply("Digite algo após !gpt")
    }

    try {
        await message.channel.sendTyping()

        const response = await axios.post("http://localhost:11434/api/generate", {
            model: "llama3.2:latest",
            prompt: prompt,
            stream: false
        })

        message.reply(response.data.response)

    } catch (error) {
        console.error(error)
        message.reply("Erro ao falar com a IA local.")
    }
})

client.login(process.env.DISCORD_TOKEN)