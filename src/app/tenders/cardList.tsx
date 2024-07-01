import React from "react";
import Image from "next/image";

interface CardListProps {
  data: {
    title: string;
    point: string;
    imageSrc: string;
  }[];
}

export const CardList: React.FC<CardListProps> = ({ data }) => {
  return (
    <div className="text-white">
      {data.map((item, index) => (
        <div
          key={index}
          className="card border border-1 border-[#1F1F1F] p-3 rounded-lg mt-1 mb-3"
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Image
                src={item.imageSrc}
                alt={item.title}
                width={50}
                height={50}
              />
              <div>
                <p className="m-0 flex items-center gap-2">{item.title}</p>
                <p className="m-0 text-[10px] flex items-center gap-2">
                  <Image src="/coin.svg" alt="coin" width={12} height={12} />{" "}
                  {"+"}
                  {item.point}
                </p>
              </div>
            </div>
            <div>
              <Image
                src="/right-arrow.svg"
                alt="right-arrow"
                width={25}
                height={32}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default CardList;
