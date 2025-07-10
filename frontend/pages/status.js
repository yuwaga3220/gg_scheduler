// pages/status.js
import { PrismaClient } from '@prisma/client';
import React from 'react';
import Link from 'next/link';
import styles from "@/styles/status.module.css";


export default function StatusPage({ scheduleByTime, communityName, communityId }) {
  const sortedTimes = ['13:00-', '14:00-', '15:00-', '16:00-', '17:00-', '18:00-', '19:00-', '20:00-', '21:00-', '22:00-', '23:00-', '24:00-', '25:00-', '26:00-'];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        みんなの予定
      </h1>

      <p style={{ marginBottom: '1rem' }}>
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
                    <div style={{ marginTop: '0.3rem', color: '#ffd700', fontWeight: 'bold' }}>
                        フルパ準備完了
                    </div>
                )}
                {isAlmost && (
                    <div style={{marginTop: '0.3rem', color: '#ff4d4f', fontWeight: 'bold' }}>
                        あとひとりでフルパできます
                    </div>
                )}
              </>
              )}
          </div>
        );
      })}
    </div>
  );
}

// ✅ サーバーサイドでクエリを取得
export async function getServerSideProps(context) {
  const prisma = new PrismaClient();
  const today = new Date().toISOString().slice(0, 10);
  const { communityId } = context.query;

  if (!communityId) {
    return {
      redirect: {
        destination: '/register',
        permanent: false,
      },
    };
  }

  const community = await prisma.community.findUnique({
    where: { id: communityId },
  });

  if (!community) {
    return {
      notFound: true,
    };
  }

  // ✅ communityId に一致するデータだけ取得
  const entries = await prisma.scheduleEntry.findMany({
    where: {
      date: today,
      communityId: communityId,
    },
  });

  const scheduleByTime = {};
  entries.forEach(({ userName, timeSlots }) => {
    const times = JSON.parse(timeSlots);
    times.forEach((time) => {
      if (!scheduleByTime[time]) scheduleByTime[time] = [];
      scheduleByTime[time].push(userName);
    });
  });

  return {
    props: {
      scheduleByTime,
      communityName: community.name,
      communityId,
    },
  };
}
