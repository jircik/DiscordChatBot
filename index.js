require("dotenv").config();

const { Client, GatewayIntentBits } = require("discord.js");
const { askGroq } = require("./services/groqService");
const setupCommand = require("./commands/setup");

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

client.on("interactionCreate", async interaction => {

    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === "setup") {
        await setupCommand.execute(interaction);
    }
});

client.on("messageCreate", async (message) => {

    if (message.author.bot) return;

    if (!message.channel.parent || message.channel.parent.name !== "GPT") return;

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

        console.error(error);

        message.reply("Erro ao processar sua solicitação.");

    }

});

client.login(process.env.DISCORD_TOKEN);