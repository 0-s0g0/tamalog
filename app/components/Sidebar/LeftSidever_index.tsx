import React from "react";
import Link from "next/link";
import stylesSidever from "./LeftSidebar.module.css"; // スタイルのインポート
import { UserCircle, Keyboard, TrayArrowUp, Footprints, ClipboardText, DeviceMobileCamera, CalendarCheck } from "@phosphor-icons/react";


interface LeftsideverINDEXProps {
  isLoggedIn: boolean;
  setIsLogoutModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSignUpModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsTextInputModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsImageInputModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsCalendarModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const LeftsideverINDEX: React.FC<LeftsideverINDEXProps> = ({
  isLoggedIn,
  setIsLogoutModalOpen,
  setIsSignUpModalOpen,
  setIsTextInputModalOpen,
  setIsImageInputModalOpen,
  setIsCalendarModalOpen,
}) => {
  return (
      <div className={stylesSidever.sidebarA}>
      {isLoggedIn ? (
        <button onClick={() => setIsLogoutModalOpen(true)} className={stylesSidever.sidebarButton}>
          <div className={stylesSidever.buttonContent}>
            <UserCircle size={50} color="#4f2f2f" weight="duotone" />
            <div className={stylesSidever.buttonText}>ろぐあうと</div>
          </div>
        </button>
      ) : (
        <button onClick={() => setIsSignUpModalOpen(true)} className={stylesSidever.sidebarButton}>
          <div className={stylesSidever.buttonContent}>
            <UserCircle size={50} color="#4f2f2f" weight="duotone" />
            <div className={stylesSidever.buttonText}>ろぐいん</div>
          </div>
        </button>
      )}

      <button onClick={() => setIsTextInputModalOpen(true)} className={stylesSidever.sidebarButton}>
        <div className={stylesSidever.buttonContent}>
          <Keyboard size={50} color="#4f2f2f" weight="duotone" />
          <div className={stylesSidever.buttonText}>てきすと入力</div>
        </div>
      </button>

      <button onClick={() => setIsImageInputModalOpen(true)} className={stylesSidever.sidebarButton}>
        <div className={stylesSidever.buttonContent}>
          <TrayArrowUp size={50} color="#4f2f2f" weight="duotone" />
          <div className={stylesSidever.buttonText}>いめーじ入力</div>
        </div>
      </button>

      <button onClick={() => setIsCalendarModalOpen(true)} className={stylesSidever.sidebarButton}>
        <div className={stylesSidever.buttonContent}>
          <Footprints size={50} color="#4f2f2f" weight="duotone" />
          <div className={stylesSidever.buttonText}>すぽーつ入力</div>
        </div>
      </button>

      <Link href="/create-post" passHref>
        <button className={stylesSidever.sidebarButton}>
          <div className={stylesSidever.buttonContent}>
            <ClipboardText size={50} color="#4f2f2f" weight="duotone" />
            <div className={stylesSidever.buttonText}>あかうんと</div>
          </div>
        </button>
      </Link>

      <Link href="/mobile-page" passHref>
        <button className={stylesSidever.sidebarButton}>
          <div className={stylesSidever.buttonContent}>
            <DeviceMobileCamera size={50} color="#4f2f2f" weight="duotone" />
            <div className={stylesSidever.buttonText}>すまほ</div>
          </div>
        </button>
      </Link>

    </div>
    
  );
};

export default LeftsideverINDEX;
