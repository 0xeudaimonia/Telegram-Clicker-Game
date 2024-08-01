import Script from "next/script";
import React from "react";
import { Roboto_Mono } from "next/font/google";
import Navbar from "@app/navbar";
import User from "@components/User";
import BottomNav from "@app/bottomNav";
import "../../app/style.css";

interface LayoutHomeProps {
  children: React.ReactNode;
}

const inter = Roboto_Mono({ weight: ["400", "700"], subsets: ["latin"] });

function LayoutHome({ children }: LayoutHomeProps) {
  return (
    <html lang="en">
      <head>
        <Script
          strategy="beforeInteractive"
          src="https://telegram.org/js/telegram-web-app.js"
        />
      </head>
      <body className={inter.className}>
        <Navbar />
        <User />
        <div className="card border-t-2 p-4 pb-16" id="border-card">
          {children}
        </div>
        <BottomNav />
      </body>
    </html>
  );
}

export default LayoutHome;
