import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from "@/styles/index.module.css";


export default function Home() {

  const [name, setName] = useState('');
  const [times, setTimes] = useState([]);
  const [communityName, setCommunityName] = useState('');

  const [communityId, setCommunityId] = useState('mock-community') // ← モックIDをセット

  // 初期表示でモックデータを設定
  useEffect(() => {
    setCommunityName('ゲーマーズ部屋（モック）') // ← ダミー名
  }, [])


  const timeOptions = [
    '13:00-', 
    '14:00-', 
    '15:00-', 
    '16:00-', 
    '17:00-', 
    '18:00-', 
    '19:00-', 
    '20:00-', 
    '21:00-', 
    '22:00-', 
    '23:00-', 
    '24:00-', 
    '25:00-', 
    '26:00-'
  ];

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
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.heading}>	📅 今日の予定を投稿する</h1>
        <p style={{ marginBottom: '1rem' }}>
          {new Date().toLocaleDateString('ja-JP', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })} in {communityName}
        </p>

        <p style={{ marginBottom: '1.5rem' }}>
          <Link href={`/status?communityId=${communityId}`}>
            <button className={styles.button}>みんなの予定を見る</button>
          </Link>
        </p>

        <form onSubmit={handleSubmit}>
          <div>
            <label className={styles.label}>名前</label>
            <input
              type="text"
              className={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div style={{ marginTop: '1.5rem' }}>
            <label className={styles.label}>遊べる時間帯</label>
            <div className={styles.timeGrid}>
              {timeOptions.map((time) => (
                <label key={time} class={styles.timeOption} style={{ display: 'block', marginBottom: '8px' }}>
                  <input
                    type="checkbox"
                    checked={times.includes(time)}
                    onChange={() => handleCheckboxChange(time)}
                    style={{ marginRight: '16px'}}
                  />
                  {time}
                </label>
              ))}
            </div>
          </div>

          <button type="submit" style={{ margin: '1em auto 0rem', display: 'block'}} className={styles.button}>
            送信
          </button>
        </form>
      </div>
    </div>

  );
}
