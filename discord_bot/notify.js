// discord_bot/notify.js
// 指定の時間にディスコードフックにURLを送信する
const cron = require('node-cron');

const { sendToWebhook, getAllCommunities } = require('./utils');
// テスト用で毎分通知する場合'* * * * *'
// 本番用は '0 12 * * *'で毎日12時に投稿するようにする
cron.schedule('0 3 * * *', async () => { 
  const today = new Date().toISOString().slice(0, 10); // 例: 2025-06-21
  const communities = await getAllCommunities(); 

  // テスト用で固定
  // const webhookUrl = 'https://discordapp.com/api/webhooks/1385323548150599761/StsJiTyNZHWv1oiWObXhP_MUI68CVXerdYopFz6AeiwYD0ek2TP7eEvLV3lNohPnHWPF'

  for (const community of communities) {
    const registerUrl = `https://gg-scheduler.vercel.app/?communityId=${community.id}`;
    const statusUrl = `https://gg-scheduler.vercel.app/status?communityId=${community.id}`
    const content = [
      `🎮 ${today} の予定共有リンク`,
      `📝 予定登録: ${registerUrl}`,
      `👀 みんなの予定: ${statusUrl}`,
    ].join('\n');

    console.log(`🔗 [${community.name}] webhook URL: ${community.webhook}`);

    // 本番ではcommunity.webhook
    const result = await sendToWebhook(community.webhook, content, community.name);
    console.log(result);
  }
});
