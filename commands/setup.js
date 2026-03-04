const { PermissionFlagsBits, ChannelType } = require("discord.js");

async function execute(interaction) {

    if (!interaction.member.permissions.has(PermissionFlagsBits.ManageGuild)) {
        return interaction.reply({
            content: "Você precisa da permissão **Gerenciar Servidor** para usar este comando.",
            ephemeral: true
        });
    }

    const guild = interaction.guild;

    // Procurar categoria GPT
    let category = guild.channels.cache.find(
        c => c.name === "GPT" && c.type === ChannelType.GuildCategory
    );

    if (!category) {
        category = await guild.channels.create({
            name: "GPT",
            type: ChannelType.GuildCategory
        });
    }

    // Procurar canal setup
    let setupChannel = guild.channels.cache.find(
        c => c.name === "chat-setup" && c.parentId === category.id
    );

    if (!setupChannel) {
        setupChannel = await guild.channels.create({
            name: "chat-setup",
            type: ChannelType.GuildText,
            parent: category.id
        });

        await setupChannel.send(
            `👋 **DcGPT configurado!**

Use qualquer canal dentro da categoria **GPT** para conversar comigo.

📌 Dicas:
• Crie novos canais para organizar conversas
• Ex: \`java-help\`, \`backend\`, \`ai-discussion\`

Divirta-se!`
        );
    }

    interaction.reply({
        content: "✅ Bot configurado com sucesso!",
        ephemeral: true
    });
}

module.exports = { execute };