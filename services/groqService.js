const axios = require("axios");

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
                temperature: 0.7,
                max_tokens: 800
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
                    "Content-Type": "application/json"
                },
                timeout: 30000
            }
        );

        return response.data?.choices?.[0]?.message?.content || "Sem resposta.";

    } catch (error) {
        console.error("GROQ ERROR:", error.response?.data || error.message);
        return "A IA está temporariamente indisponível.";
    }
}

module.exports = { askGroq };