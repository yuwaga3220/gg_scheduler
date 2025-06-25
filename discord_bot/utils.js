// discord_bot/utils.js
const { PrismaClient } = require('@prisma/client');
const fetch = require('node-fetch');
require('dotenv').config(); // .envの読み込み（必要に応じて）

const prisma = new PrismaClient();

async function getAllCommunities() {
  try {
    return await prisma.community.findMany();
  } catch (err) {
    console.error('❌ DB取得失敗:', err);
    return [];
  }
}

async function sendToWebhook(webhookUrl, content, communityName) {
  try {
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content }),
    });

    if (res.ok) {
      return `✅ ${communityName} に送信成功`;
    } else {
      const text = await res.text();
      return `❌ ${communityName} に送信失敗: ${res.status} ${text}`;
    }
  } catch (err) {
    return `❌ ${communityName} 送信中エラー: ${err.message}`;
  }
}

module.exports = {
  getAllCommunities,
  sendToWebhook,
};
