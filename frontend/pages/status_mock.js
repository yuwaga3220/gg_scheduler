// pages/status_mock.js
import React from 'react';
import Link from 'next/link';
import styles from "@/styles/status.module.css";

export default function StatusMockPage() {
  const communityName = 'テスト用ゲーマーズ集会所';
  const communityId = 'mock-id';
  const scheduleByTime = {
    '20:00-': ['ゆう', 'たかし', 'pepe', 'yapo'],
    '21:00-': ['ゆう'],
    '22:00-': ['たかし'],
    '24:00-': ['さとし', 'かな', 'ゆう', 'omu', 'rit', 'wata'],
  };


  const sortedTimes = ['13:00-', '14:00-', '15:00-', '16:00-', '17:00-', '18:00-', '19:00-', '20:00-', '21:00-', '22:00-', '23:00-', '24:00-', '25:00-', '26:00-'];

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.heading}>
          📅 みんなの予定
        </h1>

        <p style={{ marginBottom: '1rem'}}>
          {new Date().toLocaleDateString('ja-JP',
          { year: 'numeric', 
            month: 'long',
            day: 'numeric' },
            )} in {communityName}
        </p>

        <p style={{ marginBottom: '2rem' }}>
          <Link href={`/?communityId=${communityId}`}>
            <button className={styles.button}>
              予定を追加・変更する
            </button>
          </Link>
        </p>

        {sortedTimes.map((time) => {
          const people = scheduleByTime[time] || [];
          const isEmpty = people.length === 0;
          const isBusy = people.length >= 5;
          const isAlmost = people.length === 4;
          
          return (
            <div
              key={time}
              className={[
                styles.timeBlock,
                isEmpty ? styles.empty : '',
                isBusy ? styles.busy : ''
              ].join(' ')}
            >
              <strong>🕒 {time}</strong><br />
              {isEmpty
                ? '（誰もいません）'
                : (
                <>
                  {people.length}人 ({people.join(', ')})
                  {isBusy && (
                      <div style={{ marginTop: '0.3rem', color: '#202225', fontWeight: 'bold' }}>
                          参加者が5人に達しました！
                      </div>
                  )}
                  {isAlmost && (
                      <div style={{marginTop: '0.3rem', color: '#ff4d4f', fontWeight: 'bold' }}>
                          あとひとりで5人に達します
                      </div>
                  )}
                </>
                )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
