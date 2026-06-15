require("dotenv").config();
const { Telegraf } = require("telegraf");
const startDailyCompliment = require("./jobs/dailyCompliment");

const { generateCompliment, generateWish } = require("./services/groq");

const bot = new Telegraf(process.env.BOT_TOKEN);

require("./utils/start")(bot);
startDailyCompliment(bot);

bot.on("callback_query", async (ctx) => {
    const action = ctx.callbackQuery.data;

    if (action === "compliment") {
        await ctx.answerCbQuery();
        ctx.reply(await generateCompliment());
    }

    if (action === "wish") {
        await ctx.answerCbQuery();
        ctx.reply(await generateWish());
    }
});

bot.launch();

console.log("🤖 Bot is running...");