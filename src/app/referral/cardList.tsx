import React from "react";
import Image from "next/image";

interface CardListProps {
  data: {
    title: string;
    points: string;
    imageSrc: string;
  }[];
}

const CardList: React.FC<CardListProps> = ({ data }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-white mb-4">
      {data.map((item, index) => (
        <div
          key={index}
          className="card bg-[#0040A1] bg-[url(/cardList.png)] bg-no-repeat bg-cover p-3 rounded-lg"
        >
          <div className="flex gap-3 items-center">
            <Image
              src={item.imageSrc !== ""? item.imageSrc : "/avatar.png"}
              alt={item.title}
              width={50}
              height={50}
            />
            <div>
              <h3 className="text-base">{item.title}</h3>
              <div className="flex gap-x-1">
                <Image src={"/coin.svg"} alt={"coin"} width={12} height={12} />
                <p className="text-[10px] m-0">{item.points}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardList;
