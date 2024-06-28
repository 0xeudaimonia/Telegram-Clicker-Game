import React from "react";
import Image from "next/image";
import { useState } from "react";

export default function Card() {
  const [floorsBuilt, setFloorsBuilt] = useState(513);
  const [floorsToUpdate, setFloorsToUpdate] = useState(513);
  const [rentInHour, setRentInHour] = useState(513);
  const handleReset = () => {
    setFloorsBuilt(0);
    setFloorsToUpdate(0);
    setRentInHour(0);
  };
  return (
    <div className="card border-t-2 p-4" id="border-card">
      <div className="flex justify-center items-center gap-3 text-center">
        <div className="card mb-4 bg-[#1F1F1F] p-2 px-6">
          <h6 className="text-xs text-[#2496FF]">Floors built</h6>
          <div className="flex gap-2 pt-2 justify-center items-center">
            <Image src="/coin.svg" alt="avatar" width={24} height={24} />
            <p className="text-lg m-0">+{rentInHour}</p>
          </div>
        </div>
        <div className="card mb-4 bg-[#1F1F1F] p-2">
          <h6 className="text-xs text-[#FABB1E]">Floors to update</h6>
          <div className="flex gap-2 pt-2 justify-center items-center">
            <p className="text-lg m-0">+{rentInHour}</p>
          </div>
        </div>
        <div className="card mb-4 bg-[#1F1F1F] p-2 px-6">
          <h6 className="text-xs text-[#0FD73B]">Rent in hour</h6>
          <div className="flex gap-2 pt-2 justify-center items-center">
            <Image src="/coin.svg" alt="avatar" width={24} height={24} />
            <p className="text-lg m-0">+{rentInHour}</p>
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
          className="w-full h-full object-cover"
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
    </div>
  );
}
