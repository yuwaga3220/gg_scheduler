// pages/status.js
import { PrismaClient } from '@prisma/client';
import React from 'react';
import Link from 'next/link';

export default function StatusPage({ scheduleByTime, communityName, communityId }) {
  const sortedTimes = ['13:00-', '14:00-', '15:00-', '16:00-', '17:00-', '18:00-', '19:00-', '20:00-', '21:00-', '22:00-', '23:00-', '24:00-', '25:00-', '26:00-'];

  return (
    <div style={{ padding: '2rem' }}>
      <h1>今日の「{communityName} 」のみんなのプレイ予定</h1>
      <p>日付: {new Date().toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

      <p>
        <Link href={`/?communityId=${communityId}`}>
          <button>予定を追加・変更する</button>
        </Link>
      </p>

      {sortedTimes.map((time) => (
        <div key={time}>
          <strong>🕒 {time}:</strong>{' '}
          {scheduleByTime[time]?.length
            ? `${scheduleByTime[time].length}人 (${scheduleByTime[time].join(', ')})`
            : '（誰もいません）'}
        </div>
      ))}
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
