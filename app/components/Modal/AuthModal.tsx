// components/Modal/AuthModal.tsx

import React, { useState } from 'react';
import Image from 'next/image';
import styles from './01Modal.module.css';
import piyo01 from '../../public/piyo01.png';

interface AuthModalProps {
  isSignUpModalOpen: boolean;
  setIsSignUpModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isLoginMode: boolean;
  setIsLoginMode: React.Dispatch<React.SetStateAction<boolean>>;
  handleAuthSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  handleLogout: () => void;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
}

const AuthModal: React.FC<AuthModalProps> = ({
  isSignUpModalOpen,
  setIsSignUpModalOpen,
  isLoginMode,
  setIsLoginMode,
  handleAuthSubmit,
  handleLogout,
  email,
  setEmail,
  password,
  setPassword,
}) => {
  if (!isSignUpModalOpen) return null;

  return (
    <div className={styles.modalBackground}>
      <div className={styles.modalContent}>
       
        {/* ログインモードの内容 */}
        {isLoginMode ? (
          <div >
            <h2 className={styles.modaltitle}>ろぐいん</h2>
            <form onSubmit={handleAuthSubmit}>
              <div className="mb-4 mt-4">
                <label  className={styles.modalsubtitle}>Email:</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border p-2 w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className={styles.modalsubtitle}>Password:</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border p-2 w-full"
                  required
                />
              </div>
              <button type="submit" className={styles.modalButton}>
                ろぐいんする
              </button>
            </form>
          </div>
        ) : (
          // サインアップモードの内容
          <>
            <h2 className={styles.modaltitle}>さいんあっぷ</h2>
            <form onSubmit={handleAuthSubmit}>
              <div className="mb-4 mt-4">
                <label className={styles.modalsubtitle}>Email:</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border p-2 w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className={styles.modalsubtitle}>Password:</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border p-2 w-full"
                  required
                />
              </div>
              <button type="submit" className={styles.modalButton}>
                さくせい
              </button>
            </form>
          </>
        )}

        {/* 横棒 */}
        <div className="my-4 border-t border-gray-300" />

        {/* 新規登録の誘導テキスト */}
        <div className="text-center mb-4">
          {isLoginMode ? (
            <p className={styles.modaldesc}>
              あかうんとをお持ちでないですか？{' '}
              <span
                onClick={() => setIsLoginMode(false)}
                className="text-blue-500 cursor-pointer"
              >
                作成はこちら
              </span>
            </p>
          ) : (
            <p className={styles.modaldesc}>
              すでにあかうんとをお持ちですか？{' '}
              <span
                onClick={() => setIsLoginMode(true)}
                className="text-blue-500 cursor-pointer"
              >
                ろぐいんはこちら
              </span>
            </p>
          )}
        </div>

        {/* モーダルを閉じるボタン */}
        <button
          type="button"
          onClick={() => setIsSignUpModalOpen(false)}
          className={styles.modalButtonclose}
        >
          閉じる
        </button>
       <Image src={piyo01} alt="Piyo" width={150} height={150} className={styles['overlay-image']} />
      </div>

    </div>
  );
};

export default AuthModal;
