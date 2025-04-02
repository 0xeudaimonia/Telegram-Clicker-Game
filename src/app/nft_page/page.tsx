"use client";

import React, { useState } from "react";
import Image from "next/image";
import Button from "@/components/Button";

const Page = () => {
  const [quantity, setQuantity] = useState(1);
  const costPerUnit = 2;

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const totalAmount = quantity * costPerUnit;

  return (
    <>
      <div className="text-white pb-10">
        <Image
          src={"/nftpage.png"}
          alt={"nftpage"}
          width={1920}
          height={1080}
        />

        <div className="flex justify-between items-center mt-3">
          <p className="font-bold">Стоимость за единицу</p>
          <p className="font-bold">{costPerUnit} TON</p>
        </div>
        <hr className="border-[#1F1F1F]" />
        <div className="flex justify-between items-center my-3">
          <p className="font-bold m-0">Выберите количество</p>
          <div className="flex gap-2 items-center border border-1 border-[#2496FF] rounded-full px-3">
            <button onClick={incrementQuantity}>+</button>
            <p className="font-bold m-0">{quantity}</p>
            <button onClick={decrementQuantity}>-</button>
          </div>
        </div>
        <hr className="border-[#1F1F1F]" />
        <div className="flex justify-between items-center mt-3">
          <p className="font-bold">Общая сумма</p>
          <p className="font-bold">{totalAmount} TON</p>
        </div>

        <Button
          className="btn bg-[url(/bgButton.png)] bg-no-repeat bg-cover btn-primary w-full"
          label="Kaufe NFT"
        />
      </div>
    </>
  );
};

export default Page;
