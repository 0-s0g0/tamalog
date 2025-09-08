// SportsCount.tsx
import React, { useEffect, useState } from 'react';
import styles from './CardSports.module.css';
import Image from 'next/image';
import { EntrySports } from '../type';

import Boxing from '../../public/SportsBoxing.png';
import Ring from '../../public/SportsRing.png';
import Swimming from '../../public/SportsSwimming.png';
import Walking from '../../public/SportsWalking.png';

// アイコンのマッピングオブジェクトを作成
const iconMap: { [key: string]: any } = {
    Boxing: Boxing,
    Ring: Ring,
    Swimming: Swimming,
    Walking: Walking,
  };

  
  

interface Props {
  entrySports: EntrySports[];
}

interface SportsTotal {
  icon: string;
  totalHours: number;
}

const CardSports: React.FC<Props> = ({ entrySports }) => {
  const [sportsTotals, setSportsTotals] = useState<SportsTotal[]>([]);

  // スポーツの合計時間を計算
  useEffect(() => {
    if (entrySports.length > 0) {
      const totals: { [key: string]: SportsTotal } = {};

      entrySports.forEach((entry) => {
        const timeInHours = parseFloat(entry.time);
        if (!isNaN(timeInHours)) {
          if (totals[entry.icon]) {
            totals[entry.icon].totalHours += timeInHours;
          } else {
            totals[entry.icon] = {
              icon: entry.icon,
              totalHours: timeInHours,
            };
          }
        }
      });

      setSportsTotals(Object.values(totals));
    }
  }, [entrySports]);

  return (
    <div className="grid gap-5 mb-8">
      {sportsTotals.map((sport, index) => (
        <div key={index} className={styles.metricCard}>
          <div className={styles.iconWrapper}>
            <Image
              src={iconMap[sport.icon] || '/default.png'} // マッピングに基づいて動的に表示
              alt={sport.icon}
              width={70}
              height={70}
            />
          </div>
          <div className={styles.metricContent}>
            <div className={styles.metricLabel}>{sport.icon}</div>
            <div className={styles.metricValue}>
              {sport.totalHours.toFixed(2)} H
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardSports;
