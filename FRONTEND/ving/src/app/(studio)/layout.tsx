import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from 'next/font/local';
import StudioNav from "@/components/NavBar/StudioNav";
import * as styles from './layout.css'
import '../../styles/reset.css'
import Studio from "@/containers/studio";
import StudioMenu from "@/containers/studio/StudioMenu";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ving",
  description: "Generated by create next app",
};

const pretendard = localFont({
  src: "../../../public/fonts/Pretendard-Regular.woff",
  display: "swap",
  weight: "45 920",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const initOpenState = true

  return (
    <html lang="kr">
      <body className={`${styles.layout} ${pretendard.className}`}>
        <StudioNav />
        <div className={styles.contentContainer}>
          <StudioMenu />
          <div className={styles.mainContent}>
            {children}
          </div>          
        </div>
      </body>
    </html>
  );
}
