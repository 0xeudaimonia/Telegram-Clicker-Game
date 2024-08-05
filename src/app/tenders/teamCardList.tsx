import React from "react";
import Image from "next/image";
import Link from "next/link";

interface TeamListProps {
  data: {
    title: string;
    imageSrc: string;
  }[];
}

export const TeamList: React.FC<TeamListProps> = ({ data }) => {
  return (
    <div className="text-white mt-1.5">
      {data.map((item, index) => (
        <div
          key={index}
          className="card border border-1 border-amber-500 p-3 bg-stone-800 rounded-lg mt-1 mb-3"
         style={{borderBottom:'none'}}>
          <div className="flex justify-between items-center ">
          <Link
              href={`tenders/${item.title.replace(" ", "-").toLowerCase()}`}
            >
            <div className=" items-center gap-2">
              <Image
              className="mx-auto "
                src={item.imageSrc}
                alt={item.title}
                width={70}
                height={50}
              />
            <div>
                <p className="m-0 items-center gap-2">{item.title}</p>
            </div>
            </div>
            </Link>
            {/* <Link
              href={`tenders/${item.title.replace(" ", "-").toLowerCase()}`}
            >
              <div>
                <Image
                  src="/right-arrow.svg"
                  alt="right-arrow"
                  width={25}
                  height={32}
                />
              </div>
             */}
          </div>
        </div>
      ))}
    </div>
  );
};
export default TeamList;
