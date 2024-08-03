import React from "react";
import Image from "next/image";

interface TabelListProps {
  data: {
    name: string;
    pointFromFriend: string;
    pointPremium: string;
    imageSrc: string;
  }[];
}

export const TabelList: React.FC<TabelListProps> = ({ data }) => {
  return (
    <div className="text-white">
      <div className="grid grid-cols-3 justify-center">
        <p className="text-[10px] m-0 text-center">Level</p>
        <p className="text-[10px] m-0">For friend</p>
        <p className="text-[10px] m-0">Premium</p>
      </div>
      {data.length === 0 ? (
        <p>No data found</p>
      ) : (
        data.map((item, index) => (
          <div
            key={index}
            className="card border border-1 border-[#1F1F1F] p-3 rounded-lg mt-1 mb-3"
          >
            <div className="grid grid-cols-3 items-center">
              <p className="m-0 text-[10px] flex items-center gap-2">
                <Image
                  src={item.imageSrc}
                  alt={item.name}
                  width={28}
                  height={28}
                  className="rounded-full"
                />
                {item.name}
              </p>
              <p className="m-0 text-[10px] flex items-center gap-2">
                <Image src="/coin.svg" alt={item.name} width={12} height={12} />
                {item.pointFromFriend}
              </p>
              <p className="m-0 text-[10px] flex items-center gap-2">
                <Image src="/coin.svg" alt={item.name} width={12} height={12} />
                {item.pointPremium}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};
export default TabelList;
