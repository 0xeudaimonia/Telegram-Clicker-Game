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
    <div>
      <div className="flex justify-center items-center gap-2 mb-9">
        <p className="m-0">
          <b>Ассоциации застройщиков</b>
        </p>
        <Image src="/refresh.svg" alt="refresh" width={16} height={16} />
      </div>
      <div role="tablist" className="tabs tabs-boxed" id="tab">
        <a role="tab" className="tab tab-active text-white">
          <b className="text-white">Соло</b>
        </a>
        <a role="tab" className="tab text-white">
          <b className="text-white">Альянс</b>
        </a>
      </div>
      <div className="my-9 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Image src="/icon02.svg" alt="icon" width={45} height={45} />
          <h3 className=" fw-bolder">513/513</h3>
        </div>
        <div>
          <button className="btn bg-[url(/bgButton.png)] bg-cover bg-center bg-no-repeat btn-primary">
            <b>Сбросить блок</b>
          </button>
        </div>
      </div>
    </div>
  );
}
