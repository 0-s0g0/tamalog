import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./Header2.module.css"; // スタイルのインポート
import local from "../../styles/local.module.css";
import { useState } from "react";
import { UserCircle, PencilSimple, Keyboard, TrayArrowUp, Footprints, ClipboardText, DeviceMobileCamera, CalendarCheck } from "@phosphor-icons/react";
import Input from "postcss/lib/input";
// 画像のインポート
import logo from '../../public/logo2.png';
import InputModal from "../Modal/InputModal";
import LogoutModal from "../Modal/LogoutModal";
import TextInputModal from "../Modal/TextInput_UI";
import ImageInputModal from "../Modal/ImageInputModal";
import { setMaxListeners } from "events";

interface Header2indexProps {
  isLoggedIn: boolean;
  setIsLogoutModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSignUpModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsImageInputModalOpen:React.Dispatch<React.SetStateAction<boolean>>;
  setIsTextInputModalOpen:React.Dispatch<React.SetStateAction<boolean>>;

}

const Header2index: React.FC<Header2indexProps> = ({
  isLoggedIn,
  setIsLogoutModalOpen,
  setIsSignUpModalOpen,
  setIsImageInputModalOpen,
  setIsTextInputModalOpen,
}) => {

  const[isInputModalOpen, setIsInputModalOpen]=useState(false);

  return (
    <header className={styles.header}>
        <div className={styles.logo}>
          <Image src={logo} alt="Logo" width={100} height={50} />
        </div>
        <div className={styles.Buttonleft}>
            {isLoggedIn ? (
                <button onClick={() => setIsLogoutModalOpen(true)}  className={styles.HeadButton}>
                    <UserCircle size={40} color="#4f2f2f" weight="duotone" />
                    <div className={styles.text}>ログアウト</div>
                </button>
            ) : (
                <button onClick={() => setIsSignUpModalOpen(true)}   className={styles.HeadButton}>
                    <UserCircle size={40} color="#4f2f2f" weight="duotone"  className={styles.icons}/>
                    <div className={styles.text}>ログイン</div>
                </button>
            )}

         <button onClick={() => setIsInputModalOpen(true)}  className={styles.HeadButton}>
                <PencilSimple size={40} color="#4f2f2f" weight="fill" className={styles.icons}/>
                <div className={styles.text}>にゅうりょく</div>
         </button>
      </div>

        <InputModal
        isInputModalOpen={isInputModalOpen}
        setIsInputModalOpen={setIsInputModalOpen}
        setIsTextInputModalOpen={setIsTextInputModalOpen}
        setIsImageInputModalOpen={setIsImageInputModalOpen}
        />


        

    </header>
  );
};

export default Header2index;