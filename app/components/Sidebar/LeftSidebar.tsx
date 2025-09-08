import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import LeftsideverINDEX from "./LeftSidever_index"; // 左サイドバーのボタンの部分
//type
import { Entry,EntryAC, EntrySports } from '../type';
 // Firebase
import { auth, db} from '../../../firebase/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { signOut } from "firebase/auth";

//
//copmponents
import TextInputModal from '../Modal/TextInput_UI' ; 
import TextfromIMAGEModal from '../Modal/TextfromIMAGE_UI' ; 
import AuthModal from '../Modal/AuthModal';
import NicknameModal from '../Modal/Nickname'
import LogoutModal from '../Modal/LogoutModal';
import CalendarModal from '../Modal/CalenderModal'
import CheerModal from '../Modal/CheerModal';
import ProfileModal from '../Modal/ProfileModal';
import ImageInputModal from "../Modal/ImageInputModal";

const Leftsidever: React.FC = () => {
  const router = useRouter();
  const [entries, setEntries] = useState<Entry[]>([]);
  const [entryAC, setEntryAC] = useState<EntryAC[]>([]);
  const [sportsEntries, setSportsEntries] = useState<EntrySports[]>([]);
   // 認証関連のstate
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [isLoginMode, setIsLoginMode] = useState(true);
   const [nickname, setNickname] = useState<string>(''); 
   const [isSignupSuccess, setIsSignupSuccess] = useState(false);
   const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);  
  //画像処理
  const [imageProcessingResults, setImageProcessingResults] = useState<number[]>([]);//画像処理の結果を次のモーダルへ渡す 

  const [isTextInputModalOpen, setIsTextInputModalOpen] = useState(false);
  const [isImageInputModalOpen, setIsImageInputModalOpen] = useState(false);
  const [isNicknameModalOpen, setIsNicknameModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);
  const [isCheerModalOpen, setIsCheerModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);


  //関数
  const handleSetNickname = (newNickname: string) => {
    setNickname(newNickname); // NicknameModal から受け取ったニックネームを設定
  };
  
  // 認証関連ハンドラー（ログイン/サインアップ）
  const handleAuthSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // フォーム送信時にページ遷移を防ぐ
  
    try {
      if (isLoginMode) {
        // ログイン処理
        await signInWithEmailAndPassword(auth, email, password);
        setIsSignUpModalOpen(false); // ログイン成功時にモーダルを即座に閉じる
        setEmail(''); // フォームをクリア
        setPassword(''); // フォームをクリア
      } else {
        // サインアップ処理
        await createUserWithEmailAndPassword(auth, email, password);
        setIsSignUpModalOpen(false);  // サインアップモーダルを閉じる
        setIsNicknameModalOpen(true); // ニックネーム設定モーダルを開く
      }
    } catch (error: any) {
      // エラーハンドリング
      if (error.code === 'auth/email-already-in-use') {
        alert('このメールアドレスはすでに使用されています。');
      } else if (error.code === 'auth/invalid-email') {
        alert('無効なメールアドレスです。');
      } else if (error.code === 'auth/wrong-password') {
        alert('間違ったパスワードです。');
      } else {
        alert('エラーが発生しました: ' + error.message);
      }
    }
  };

  // ログアウト処理
const handleLogout = async () => {
  try {
    await signOut(auth); // Firebase Auth でログアウト
    setIsLogoutModalOpen(false); // ログアウト成功時にモーダルを即座に閉じる
    setIsSignupSuccess(false); // サインアップ成功フラグをリセット
    setIsNicknameModalOpen(false); // ニックネームモーダルを閉じる
    router.push('/'); // トップページにリダイレクト
  } catch (error) {
    console.error("ログアウト時にエラーが発生しました:", error);
    alert("ログアウト時にエラーが発生しました");
  }
};

  // ログイン状態の監視
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);
    });
    
    return () => unsubscribe();
  }, []);

  const Mynickname = entryAC[entryAC.length - 1]?.nickname || 'user';

  return (
    <div>
      {/* LeftsideverINDEXに必要なプロパティを渡す */}
      <LeftsideverINDEX
        isLoggedIn={isLoggedIn}
        setIsLogoutModalOpen={setIsLogoutModalOpen}
        setIsSignUpModalOpen={setIsSignUpModalOpen}
        setIsTextInputModalOpen={setIsTextInputModalOpen}
        setIsImageInputModalOpen={setIsImageInputModalOpen}
        setIsCalendarModalOpen={setIsCalendarModalOpen}
      />
      
      {/* モーダル群 */}
      
      {/* テキスト入力用モーダルフォーム*/}
      <TextInputModal
        isTextInputModalOpen={isTextInputModalOpen}
        setIsTextInputModalOpen={setIsTextInputModalOpen}
        isCheerModalOpen={isCheerModalOpen}
        setIsCheerModalOpen={setIsCheerModalOpen}
        setEntries={setEntries}
        entries={entries}
        editingId={null}
        setEditingId={() => {}}
      />

       {/* モーダル呼び出し */}
       <ImageInputModal
        isImageInputModalOpen={isImageInputModalOpen} 
        setIsImageInputModalOpen={setIsImageInputModalOpen}
        setIsTextfromIMAGEModalOpen={setIsTextInputModalOpen}
        isTextfromIMAGEModalOpen={isTextInputModalOpen}
        imageProcessingResults={imageProcessingResults}
        setImageProcessingResults={setImageProcessingResults}
      />


      {/* TextfromIMAGEModal を組み込む */}
      <TextfromIMAGEModal 
        isTextInputModalOpen={isTextInputModalOpen}
        setIsTextInputModalOpen={setIsTextInputModalOpen}
        isCheerModalOpen={isCheerModalOpen}
        setIsCheerModalOpen={setIsCheerModalOpen}
        imageProcessingResults={imageProcessingResults}
        entries={[]}
        setEntries={() => {}}
        editingId={null}
        setEditingId={() => {}}
      />

      {/* ニックネーム設定モーダル */}
      <NicknameModal
        isNicknameModalOpen={isNicknameModalOpen}
        setIsNicknameModalOpen={setIsNicknameModalOpen}
        setEntryAC={setEntryAC}
        entryAC={entryAC}
        editingId={null}
        setEditingId={() => {}}
        handleSetNickname={handleSetNickname}
      />

      <LogoutModal
          nickname={Mynickname} // 親から渡した nickname を表示
          setIsLogoutModalOpen={setIsLogoutModalOpen}
          isLogoutModalOpen={isLogoutModalOpen}
          handleLogout={handleLogout}
       />

      <CheerModal
          setIsCheerModalOpen={setIsCheerModalOpen}
          isCheerModalOpen={isCheerModalOpen}
       />

      {/* ログイン・サインアップモーダル */}
      <AuthModal
        isSignUpModalOpen={isSignUpModalOpen}
        setIsSignUpModalOpen={setIsSignUpModalOpen}
        isLoginMode={isLoginMode}
        setIsLoginMode={setIsLoginMode}
        handleAuthSubmit={handleAuthSubmit}
        handleLogout={handleLogout}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
      />
        {/* モーダル */}
        <CalendarModal
        isModalOpen={isCalendarModalOpen}  // モーダルが開いているか
        setIsModalOpen={setIsCalendarModalOpen}  // モーダルを閉じる関数
        setSportsEntries={setSportsEntries}  // 親のエントリ更新関数
      />

      <ProfileModal 
        isProfileModalOpen={isProfileModalOpen}
        setIsProfileModalOpen={setIsProfileModalOpen}
      />

    </div>
  );
};

export default Leftsidever;
