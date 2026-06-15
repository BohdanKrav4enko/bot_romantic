const cron = require("node-cron");
const { generateCompliment } = require("../services/groq");
require("dotenv").config();
const GIRL_ID = Number(process.env.GIRL_ID);

function startDailyCompliment(bot) {

    cron.schedule("0 * * * *", async () => {
        const hour = new Date().getHours();

        if (hour < 9 || hour > 23) return;

        if (Math.random() > 0.2) return;

        try {
            const text = await generateCompliment();

            await bot.telegram.sendMessage(
                GIRL_ID,
                `💙 ${text}`
            );

        } catch (e) {
            console.log("❌ error sending daily message:", e.message);
        }
    });

}

module.exports = startDailyCompliment;