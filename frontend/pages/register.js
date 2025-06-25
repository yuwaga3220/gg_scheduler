// pages/register.js
import { useState } from 'react';

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
    <div style={{ padding: '2rem' }}>
      <h1>サーバー登録</h1>

      {communityId ? (
        <>
          <p>✅ 登録が完了しました！</p>
          <p>このURLがDiscordに送られるようになりました👇</p>
          <code>http://172.17.64.1:3000/?communityId={communityId}</code>
        </>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label>サーバー名: </label>
            <input value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div style={{ marginTop: '1rem' }}>
            <label>Webhook URL: </label>
            <input value={webhook} onChange={(e) => setWebhook(e.target.value)} required />
          </div>
          <button type="submit" style={{ marginTop: '1rem' }}>登録</button>
        </form>
      )}
    </div>
  );
}
