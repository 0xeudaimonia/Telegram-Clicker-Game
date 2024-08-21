import Script from "next/script";
import React from "react";
import { Roboto_Mono } from "next/font/google";
import Navbar from "@app/navbar";
import User from "@components/User";
import BottomNav from "@app/bottomNav";
import { isMobile } from "react-device-detect";
import "../../app/style.css";

interface LayoutHomeProps {
  children: React.ReactNode;
}

const inter = Roboto_Mono({ weight: ["400", "700"], subsets: ["latin"] });

function LayoutHome({ children }: LayoutHomeProps) {
  return (
    <>
      {/* <Navbar /> */}
      <User />
      <div className="card border-t-2 p-4 pb-16" id="border-card">
        {children}
      </div>
      <BottomNav />
    </>
  );
}

export default LayoutHome;
