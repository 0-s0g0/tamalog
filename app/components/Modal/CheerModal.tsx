///////////////////////////////////////////
// モーダルデータ
///////////////////////////////////////////

//共通インポート
import React from 'react';
import { useState, useEffect } from 'react';
import styles from './01Modal.module.css'; 
import Link from 'next/link';
import { Entry } from '../type';
import { getFirestore, doc, setDoc, getDoc, arrayUnion } from 'firebase/firestore';
import { db, auth } from '../../../firebase/firebase'
import Cheer from '../../public/CHEER.png'
import Image from 'next/image';

interface CheerModalProps {
  isCheerModalOpen: boolean;
  setIsCheerModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CheerModal: React.FC<CheerModalProps> = ({
  isCheerModalOpen,
  setIsCheerModalOpen,
}) => {
  // モーダルを閉じる
  const closeModal = () => {
    setIsCheerModalOpen(false);
  };

  return (
    <>
      {isCheerModalOpen && (
        <div className={styles.modalBackground}>
        <div className={styles.modalContent}>
            <Image src={Cheer} alt="CHEER" width={300}/>
          <div className="flex justify-around">
          <Link href="/" passHref>
            <button
              onClick={() => setIsCheerModalOpen(false)}
              className={styles.modalButtonclose}>Close</button>
          </Link>
          </div>
        </div>
      </div>
      )}
    </>
  );
};

export default CheerModal;

