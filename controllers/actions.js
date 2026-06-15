const { generateCompliment, generateWish } = require("../services/groq");

function registerActions(bot) {

    bot.hears("💌 Получить комплимент", async (ctx) => {
        await ctx.reply("💭 думаю о тебе...");
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

    bot.on("callback_query", async (ctx) => {
        const action = ctx.callbackQuery.data;

        if (action === "compliment") {
            await ctx.answerCbQuery();
            await ctx.reply("💭 думаю о тебе...");
            await ctx.sendChatAction("typing");
            await new Promise(r => setTimeout(r, 1200));
            ctx.reply(await generateCompliment());
        }

        if (action === "wish") {
            await ctx.answerCbQuery();
            await ctx.reply("🌙 подбираю слова...");
            await ctx.sendChatAction("typing");
            await new Promise(r => setTimeout(r, 1200));
            ctx.reply(await generateWish());
        }

    });
}

module.exports = registerActions;