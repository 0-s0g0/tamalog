"use client";
///////////////////////////////////////////
// import
///////////////////////////////////////////
//main
import Link from 'next/link';
import Image from 'next/image';

//style
import styles from './styles/start.module.css';

//Image
import logo from './public/logo2.png'

///////////////////////////////////////////
// メインコンポーネント
///////////////////////////////////////////
export default function Home() {

  ///////////////////////////////////////////
  // UIレンダリング
  ///////////////////////////////////////////
  return (
    <div className={styles.startback}>
      <div className={styles.title}>

        <div className={styles.title_text}>けんこうCheers!</div>
        <Image src={logo} alt="Piyo image" className={styles.logo}></Image>
        <Link href="/mobile-page" passHref>
        <div className={styles.title_text1}>Mobile
        </div>
        </Link>
        <Link href="/components/PC" passHref>
        <div className={styles.title_text2}>PC</div>
        </Link>
        
      </div>

    </div>
    
  );
}
