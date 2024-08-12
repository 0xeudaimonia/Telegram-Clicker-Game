import React, { useEffect, useState } from "react";
import Image from "next/image";

interface CardListProps {
  data: {
    id: number;
    points: number;
    createdAt: string;
    updatedAt: string;
    data: string;
    type: number;
  }[];
}

const Card = ({ data }: CardListProps) => {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 gap-4" id="tender">
      {data.map((item) => (
        <div
          className="card border px-3 py-1 text-center tender_cards"
          key={item.id}
        >
          <h5 className="capitalize">{item.data}</h5>
          <Image
            src="/coin.svg"
            alt="coin"
            height="24"
            width="24"
            className="mx-auto my-3"
          />
          <h5>{item.points}</h5>
        </div>
      ))}
    </div>
  );
};

export default Card;
