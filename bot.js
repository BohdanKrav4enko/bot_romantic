require("dotenv").config();
const { Telegraf } = require("telegraf");
const startDailyCompliment = require("./jobs/dailyCompliment");
const ALLOWED_USERS = require("./utils/admins");

const { generateCompliment, generateWish } = require("./services/groq");

const bot = new Telegraf(process.env.BOT_TOKEN);

require("./utils/start")(bot);
startDailyCompliment(bot);

function isAllowed(ctx) {
    return ALLOWED_USERS.includes(ctx.from.id);
}

bot.hears("💌 Получить комплимент", async (ctx) => {
    if (!isAllowed(ctx)) {
        return ctx.reply("⛔ У тебя нет доступа к этой функции");
    }

    await ctx.reply("💭 думаю о тебе...");
    await ctx.sendChatAction("typing");

    await new Promise(r => setTimeout(r, 1200));

    const text = await generateCompliment();
    ctx.reply(text);
});

bot.hears("🌙 Получить пожелание", async (ctx) => {
    if (!isAllowed(ctx)) {
        return ctx.reply("⛔ У тебя нет доступа к этой функции");
    }

    await ctx.reply("🌙 подбираю слова...");
    await ctx.sendChatAction("typing");

    await new Promise(r => setTimeout(r, 1200));

    const text = await generateWish();
    ctx.reply(text);
});

bot.launch();

console.log("🤖 Bot is running...");