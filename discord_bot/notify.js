// discord_bot/notify.js
const cron = require('node-cron');

const { sendToWebhook, getAllCommunities } = require('./utils');
// テスト用で毎分通知'* * * * *'
// 本番用は '0 12 * * *'で毎日12時に投稿するようにする
cron.schedule('0 12 * * *', async () => { 
  const today = new Date().toISOString().slice(0, 10); // 例: 2025-06-21
  const communities = await getAllCommunities(); 

  // テスト用で固定
  // const webhookUrl = 'https://discordapp.com/api/webhooks/1385323548150599761/StsJiTyNZHWv1oiWObXhP_MUI68CVXerdYopFz6AeiwYD0ek2TP7eEvLV3lNohPnHWPF'

  for (const community of communities) {
    const url = `http://172.17.64.1:3000/?communityId=${community.id}`;
    const content = `🎮 ${today} の予定共有はこちら！\n${url}`;

    console.log(`🔗 [${community.name}] webhook URL: ${community.webhook}`);

    // 本番ではcommunity.webhookに直す
    const result = await sendToWebhook(community.webhook, content, community.name);
    console.log(result);
  }
});
