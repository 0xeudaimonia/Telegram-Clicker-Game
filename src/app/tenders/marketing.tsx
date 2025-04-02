"use client";
import React, { useState } from "react";
import Image from "next/image";
import clsx from "clsx";
interface DataType {
  image: string;
  name: string;
  description: string;
  title: string;
  amount: string;
  level: string;
}

const data: DataType[] = [
  {
    image: "./tChipsBig_icons1.png",
    name: "Комбо",
    description: "Ограниченный выпуск пропуска для повышения вашего опыта на Consensus",
    title: "Прибыль в час",
    amount: "513 000",
    level: "уровень 12",
  },
  {
    image: "./tChipsBig_icons2.png",
    name: "Комбо",
    description: "Ограниченный выпуск пропуска для повышения вашего опыта на Consensus",
    title: "Прибыль в час",
    amount: "513 000",
    level: "уровень 12",
  },
  {
    image: "./tChipsBig_icons3.png",
    name: "Комбо",
    description: "Ограниченный выпуск пропуска для повышения вашего опыта на Consensus",
    title: "Прибыль в час",
    amount: "513 000",
    level: "уровень 12",
  },
  {
    image: "./tChipsBig_icons4.png",
    name: "Комбо",
    description: "Ограниченный выпуск пропуска для повышения вашего опыта на Consensus",
    title: "Прибыль в час",
    amount: "513 000",
    level: "уровень 12",
  },
];

const blocks: string[] = [
  "Мои карточки",
  "Новые карточки",
  "Упущенные карточки",
];

// const getBgColor =(index:number)=>{
//     const color:string[]=['red','green','blue','orange'];
//     return `bg-${color[index]}-700`
// }

const Catagory1: React.FC = () => {
  const color: string[] = ["red", "green", "blue", "orange"];

  //
  return (
    <div className="flex flex-wrap font-roboto-mono">
      {data.map((item, index) => (
        <div
          key={index}
          className={clsx(`rounded-xl px-3 pt-4 m-1 w-[47%]`)}
          style={{
            backgroundColor: `${color[index]}`,
          }}
        >
          <Image
            src={item.image}
            alt={item.name}
            height={150}
            width={300}
            className="mx-auto"
          />
          <div className="flex flex-col items-center justify-center text-center">
            <h4>{item.name}</h4>
            <p className="text-xs pt-1 mb-2 ">{item.description}</p>
            <p className="text-xs flex mb-1.5">
              {item.title}{" "}
              <Image
                src="/uparrowicon.png"
                alt="arrow"
                width={16}
                height={16}
                className="mb-1.5 mt-1 mx-1"
              />{" "}
              {item.amount}
            </p>
            <div className="h-0.5 bg-black w-[95%] mx-5"></div>
            <div className="flex px-1 justify-start items-start w-full text-xs pb-2 ">
              <h5>{item.level}</h5>
              <span className="w-0.5 h-5 mx-2 my-1 bg-black"></span>
              <Image
                src="/uparrowicon.png"
                alt="arrow"
                width={16}
                height={16}
                className="my-2 mr-1"
              />
              <p className="mt-1.5 mb-0 text-xs ">{item.amount}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const Marketing: React.FC = () => {
  const renderData = () => {
    switch (catagory) {
      case "Новые карточки":
        return <Catagory1 />;
      case "Упущенные карточки":
        return <Catagory1 />;
      default:
        return <Catagory1 />;
    }
  };
  const [catagory, setcatagory] = useState<string>("catagory1");

  return (
    <>
      <div className="flex">
        {blocks.map((item, index) => (
          <a
            key={index}
            className={`w-1/3 border-b-2 pb-1 ${catagory === item ? `border-blue-800` : `border-stone-800`
              }`}
            onClick={() => setcatagory(item)}
          >
            {item}
          </a>
        ))}
      </div>
      <div className="pt-4">{renderData()}</div>
    </>
  );
};

export default Marketing;
