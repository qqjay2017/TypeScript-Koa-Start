import { CronJob } from "cron";


const cron = new CronJob('', () => {
    console.log("Executing cron job once every hour");
});

export { cron };