import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Home() {
  const router = useRouter();
  const { communityId } = router.query;

  const [name, setName] = useState('');
  const [times, setTimes] = useState([]);
  const [communityName, setCommunityName] = useState('');

  // ✅ router.isReady を使ってクエリが使える状態になってから処理
  useEffect(() => {
  if (!router.isReady) return;
  
  if (!router.query.communityId) {
    router.replace('/register');
    return
  }

  fetch(`/api/communityName?communityId=${communityId}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.name) setCommunityName(data.name);
    });
}, [router.isReady]);

  // ✅ クエリが読み込まれていない間は loading 表示などを返す
  if (!router.isReady) return <p>読み込み中...</p>;
  if (!communityId) return null;

  const timeOptions = ['13:00-', '14:00-', '15:00-', '16:00-', '17:00-', '18:00-', '19:00-', '20:00-', '21:00-', '22:00-', '23:00-', '24:00-', '25:00-', '26:00-'];

  const handleCheckboxChange = (time) => {
    setTimes((prev) =>
      prev.includes(time) ? prev.filter((t) => t !== time) : [...prev, time]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const today = new Date().toISOString().slice(0, 10);

    const res = await fetch('/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        times,
        communityId, // ✅ URLから取得した値をそのまま送信
        date: today
      }),
    });

    if (res.ok) {
      alert('送信完了！');
      setName('');
      setTimes([]);
    } else {
      alert('送信に失敗しました');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>今日の「{communityName}」で遊ぶ時間を教えてね</h1>
      <p>日付: {new Date().toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

      <p>
        <Link href={`/status?communityId=${communityId}`}>
          <button>みんなの予定を見る</button>
        </Link>
      </p>

      <form onSubmit={handleSubmit}>
        <div>
          <label>名前: </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div style={{ marginTop: '1rem' }}>
          {timeOptions.map((time) => (
            <label key={time} style={{ display: 'block' }}>
              <input
                type="checkbox"
                checked={times.includes(time)}
                onChange={() => handleCheckboxChange(time)}
              />
              {time}
            </label>
          ))}
        </div>
        <button type="submit" style={{ marginTop: '1rem' }}>送信</button>
      </form>
    </div>
  );
}
