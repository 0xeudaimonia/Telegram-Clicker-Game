"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
const text = ["build", "score list", "referal", "tenders", "nft page"];

export default function BottomNav() {
  const pathname = usePathname();
  return (
    <div className="p-3 fixed bottom-0 w-full">
      <div className="w-full text-white flex bg-black justify-between p-2 rounded-lg">
        {text.map((item, index) => {
          const itemPath =
            item === "build"
              ? "/"
              : `/${item.toLowerCase().replace(/\s/g, "_")}`;

          return (
            <div
              role="tablist"
              key={item}
              className={`tabs py-2 tabs-boxed rounded-lg ${
                itemPath === pathname ? "bg-[#1C1C24]" : "bg-black opacity-40"
              }`}
            >
              <Link
                href={itemPath}
                className="flex flex-col items-center w-[74px]"
              >
                <Image
                  src={`/menuBatoon_icon${index}.svg`}
                  alt={`menuBatoon_icon${index}`}
                  width={25}
                  height={25}
                />
                <span className="text-[10px]">{item}</span>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
