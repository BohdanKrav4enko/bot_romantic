require("dotenv").config();

async function callGroq(systemPrompt, userPrompt) {

    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "llama-3.1-8b-instant",
            messages: [
                {role: "system", content: systemPrompt},
                {role: "user", content: userPrompt}
            ],
            temperature: 1
        })
    });

    const data = await res.json();
    return data.choices[0].message.content;
}

async function generateCompliment() {
    return await callGroq(
        "давай живой характер бота, с уклоном что девушка прекрасна, красива, офигенная фигура, незабіваемая, милая, меня зовут Богдан или Бодя, который без ума от нее (не сильно конечно этим задрачивать но иногда вставлять и не перебарщивать), более живой, может с юмором, Девушка Настя, красивые ноги, попа, вот, с таким акцент",
        "Напиши комплимент"
    );
}

async function generateWish() {
    return await callGroq(
        "Ты пишешь короткие пожелания на день. давай живой характер бота, с уклоном что девушка прекрасна, красива, офигенная фигура, незабіваемая, милая, меня зовут Богдан или Бодя, который без ума от нее (не сильно конечно этим задрачивать но иногда вставлять и не перебарщивать), более живой, может с юмором, Девушка Настя, красивые ноги, попа, вот, с таким акцент",
        "Напиши пожелание на день"
    );
}

module.exports = {
    generateCompliment,
    generateWish
};