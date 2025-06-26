# GG_Scheduler

本アプリは、ゲーマーの方々がコミュニティ内で毎日のゲームプレイスケジュールを共有することで、  
日々のゲームライフの利便性を向上させることを目的としたアプリです。  

**No Game, No Life, No Schedule!**

## 使用技術

- React
- Next.js
- Prisma
- PostgreSQL（Renderでホスト）
- Discord Webhook 通知（Renderで実行）
- Vercel（フロントエンドのホスティング）

## 機能

- Discordサーバの登録（Webhook URL）
- スケジュールの追加・削除・変更
- スケジュールの共有・可視化
- 日時指定でDiscordに自動通知送信

## 使い方

1. 本アプリを導入したいDiscordサーバの**Webhook URL**を以下のURLから登録します  
   👉 [https://gg-scheduler.vercel.app/register](https://gg-scheduler.vercel.app/register)

2. Webhookの取得方法：  
   `Discordのサーバー設定 → アプリ → 連携サービス → ウェブフック → 新しいウェブフック → URLをコピー`

3. 指定日時になると、**スケジュール登録用URL**がDiscordに自動で送信されます。

4. サーバーメンバーが各自のスケジュールを登録・共有できます。

## 実際の利用例

- 自分の入っているゲームコミュニティで使う
- 友人の集まりに使う
- 固定メンバーでの活動管理など

## 今後の追加予定機能

- コメント機能（スケジュールへの一言添えやちょっとした会話のため）
- やりたいゲームの投票機能
- 通知時間のカスタマイズ設定 など

---

