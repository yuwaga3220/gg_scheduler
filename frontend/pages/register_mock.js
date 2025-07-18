// pages/register.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '@/styles/register.module.css';
import Image from 'next/image';

export default function RegisterPage() {
  const [serverName, setServerName] = useState('');
  const [webhookUrl, setWebhookUrl] = useState('');
  const [communityId, setCommunityId] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // --- API 叩く部分（モック） ---
    // try {
    //   const res = await fetch('/api/registerCommunity', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ name: serverName, webhook: webhookUrl }),
    //   });
    //   const data = await res.json();
    //   if (!res.ok) throw new Error('登録に失敗しました');
    //   setCommunityId(data.id);      // 正常: 登録完了
    // } catch (err) {
    //   alert(err.message);
    // }
    // --------------------------------

    // 🎨 デモ用: 仮 ID をセット
    setCommunityId('demo-1234');
  };

  // ------------- JSX -------------
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.heading}>
          <Image
            src="/gg_scheduler_icon.png"
            alt="GG Scheduler Icon"
            width={32}
            height={32}
            className={styles.icon}
          />
          サーバー登録&nbsp;
          <span className={styles.sub}>― GG Scheduler ―</span>
        </h1>

        {communityId ? (
          /* ✅ 登録完了後の表示 */
          <section className={styles.successArea}>
            <p className={styles.successBadge}>✅ 登録が完了しました！</p>
            <p>以下の URL が Discord に毎日自動送信されるようになりました👇</p>
            <code className={styles.codeBox}>
              https://gg-scheduler.vercel.app/?communityId={communityId}
            </code>
            <button
              className={styles.button}
              onClick={() => router.push(`/?communityId=${communityId}`)}
            >
              予定登録ページへ移動
            </button>
          </section>
        ) : (
          /* 📝 登録フォーム */
          <form className={styles.form} onSubmit={handleSubmit}>
            <label className={styles.label}>
              サーバー名
              <input
                type="text"
                value={serverName}
                onChange={(e) => setServerName(e.target.value)}
                placeholder="例：毎日ゲーム部"
                required
                className={styles.input}
              />
            </label>

            <label className={styles.label}>
              Webhook URL（設定→連携サービス）
              <input
                type="text"
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                placeholder="https://discord.com/api/webhooks/..."
                required
                className={styles.input}
              />
            </label>

            <button type="submit" className={styles.button}>
              サーバー登録
            </button>
          </form>
        )}

        {/* ℹ️ 説明エリア（常時表示） */}
        <section className={styles.infoArea}>
          <h2 className={styles.infoHeading}>GG Scheduler の機能</h2>
          <ul className={styles.infoList}>
            <li>指定時間に「今日の予定登録リンク」を Discord に自動投稿</li>
            <li>メンバーが参加可能時間を登録</li>
            <li>（実装予定）一定人数が集まった時間帯に通知を送信</li>
            <li>ゲーム開始前のすれ違いを防止し、スムーズに集合</li>
          </ul>

          <h3 className={styles.infoHeading}>通知サンプル</h3>
          <p className={styles.sample}>
            🎯 <b>19時-</b> の参加者が <b>5人</b> に達しました！<br />
            今日は 19:00 に集合してゲーム開始！
          </p>
        </section>
      </div>
    </div>
  );
}
