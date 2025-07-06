// pages/register.js
import { useState } from 'react';
import styles from "@/styles/register.module.css";


export default function RegisterPage() {
  const [name, setName] = useState('');
  const [webhook, setWebhook] = useState('');
  const [communityId, setCommunityId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/registerCommunity', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, webhook }),
    });
    const data = await res.json();
    if (res.ok) {
      setCommunityId(data.id);
    } else {
      alert('登録に失敗しました');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        サーバー登録
      </h1>

      {communityId ? (
        <div>
          <p className={styles.successBox}>✅ 登録が完了しました！</p>
          <p>このURLがDiscordに送られるようになりました👇</p>
          <code>https://gg-scheduler.vercel.app/?communityId={communityId}</code>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label className={styles.label}>サーバー名（例えば...「仲良しゲーム部」）: </label>
            <input type="text" className={styles.input} value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div style={{ marginTop: '1rem' }}>
            <label className={styles.label}>ウェブフックURL: </label>
            <input type="text" className={styles.input} value={webhook} onChange={(e) => setWebhook(e.target.value)} required />
          </div>
          <button className={styles.button}>登録</button>
        </form>
      )}
    </div>
  );
}
