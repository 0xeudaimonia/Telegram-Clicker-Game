import Script from "next/script";
import React from "react";
import { Roboto_Mono } from "next/font/google";
// import BottomNav from "@app/bottomNav";

interface LayoutAdminProps {
  children: React.ReactNode;
}

const inter = Roboto_Mono({ weight: ["400", "700"], subsets: ["latin"] });

function LayoutAdmin({ children }: LayoutAdminProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <Navbar /> */}
        {/* <User /> */}
        <div className="">{children}</div>
        {/* <BottomNav /> */}
      </body>
    </html>
  );
}

export default LayoutAdmin;
