const cron = require("node-cron");
const { generateCompliment } = require("../services/groq");
require("dotenv").config();

const USER_ID = Number(process.env.USER_ID);
const USER2_ID = Number(process.env.USER2_ID);

function startDailyCompliment(bot) {

    cron.schedule("0 * * * *", async () => {

        const hour = new Date().getHours();

        if (hour < 9 || hour > 23) return;

        if (Math.random() > 0.2) return;

        try {
            const text = await generateCompliment();

            const users = [USER_ID, USER2_ID];

            for (const id of users) {
                await bot.telegram.sendMessage(id, `💙 ${text}`);
            }

        } catch (e) {
            console.log("❌ error sending daily message:", e.message);
        }
    });

}

module.exports = startDailyCompliment;