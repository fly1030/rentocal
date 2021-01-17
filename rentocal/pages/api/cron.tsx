import * as cron from 'node-cron';

const task = cron.schedule('0 0 8 * * *', async () => {
    const productionURL = "https://rentocal.vercel.app/DailyDigest";
    const element = document.createElement("iframe"); 
    element.setAttribute('id', 'myframe');
    element.setAttribute('src', productionURL);
    element.style.display = "none";
    document.body.appendChild(element);
    document.body.removeChild(element);
});
task.start();
