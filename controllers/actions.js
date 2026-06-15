const { generateCompliment, generateWish } = require("../services/groq");

function registerActions(bot) {

    bot.hears("💌 Получить комплимент", async (ctx) => {
        await ctx.reply("💭 думаю о тебе...");
        await ctx.sendChatAction("typing");

        await new Promise(r => setTimeout(r, 1200));

        const text = await generateCompliment();
        ctx.reply(text);
    });

    bot.hears("🌙 Получить пожелание", async (ctx) => {
        await ctx.reply("🌙 подбираю слова...");
        await ctx.sendChatAction("typing");

        await new Promise(r => setTimeout(r, 1200));

        const text = await generateWish();
        ctx.reply(text);
    });
}

module.exports = registerActions;