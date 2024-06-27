"use client";
import Navbar from "./navbar";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [floorsBuilt, setFloorsBuilt] = useState(513);
  const [floorsToUpdate, setFloorsToUpdate] = useState(513);
  const [rentInHour, setRentInHour] = useState(513);
  const handleReset = () => {
    setFloorsBuilt(0);
    setFloorsToUpdate(0);
    setRentInHour(0);
  };
  return (
    <main className="bg-[#0E0E14] text-white min-h-screen">
      <Navbar />
      <div className="container mx-auto p-4">
        <div className="flex justify-start items-center mb-4">
          <Image
            src="/avatar.jpeg"
            alt="avatar"
            width={32}
            height={32}
            className="rounded-full"
          />
          <h2 className="text-lg font-bold ms-4">Gleb Vashkevich (Пpopaб)</h2>
        </div>
        <div className="flex justify-center items-center gap-3 text-center">
          <div className="card mb-4 bg-[#1F1F1F] p-4">
            <h2 className="card-title">Floors built</h2>
            <div className="flex gap-2 justify-center items-center">
              <Image src="/coin.svg" alt="avatar" width={24} height={24} />
              <p className="text-lg">+{rentInHour}</p>
            </div>
          </div>
          <div className="card mb-4 bg-[#1F1F1F] p-4">
            <h2 className="card-title">Floors to update</h2>
            <div className="flex gap-2 justify-center items-center">
              <p className="text-lg">+{rentInHour}</p>
            </div>
          </div>
          <div className="card mb-4 bg-[#1F1F1F] p-4">
            <h2 className="card-title">Rent in hour</h2>
            <div className="flex gap-2 justify-center items-center">
              <Image src="/coin.svg" alt="avatar" width={24} height={24} />
              <p className="text-lg">+{rentInHour}</p>
              <Image src="/i_icon.svg" alt="avatar" width={24} height={24} />
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center gap-3 my-5">
          <Image src="/coin_60.svg" alt="building" width={60} height={60} />
          <h2 className="">513 000</h2>
        </div>
        <div>
          <Image
            src="/mask_group.png"
            alt="mask_group"
            width={350}
            height={300}
            className="w-full h-96"
          />
        </div>
        <div className="my-9 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Image src="/icon02.svg" alt="icon" width={45} height={45} />
            <h3 className=" fw-bolder">513/513</h3>
          </div>
          <div>
            <button className="btn btn-primary">
              <b>Сбросить блок</b>
            </button>
          </div>
        </div>
        <div className="flex justify-between items-center mb-4">
          <button>score list referal</button>
          <button>tenders</button>
          <button>nft page</button>
        </div>
      </div>
    </main>
  );
}
