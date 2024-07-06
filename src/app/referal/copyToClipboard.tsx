"use client";
import { useCallback } from "react";
import Image from "next/image";

const CopyToClipboard = () => {
  const handleCopy = useCallback(() => {
    navigator.clipboard
      .writeText("Пригласить друга")
      .then(() => {
        console.log("Copied to clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  }, []);

  return (
    <div className="flex justify-center text-center items-center gap-3 bottom-[5.5rem] fixed w-[91%]">
      <div className="card bg-[#FABB1E] p-3 border border-1 border-[#1F1F1F] rounded-lg bg-[url(/mainButton_Gold.png)] w-full">
        <p className="m-0 text-[#002050]">
          <b>Пригласить друга</b>
        </p>
      </div>
      <button
        className="btn bg-[url(/bgButton.png)] bg-no-repeat bg-cover btn-primary"
        onClick={handleCopy}
      >
        <Image src="/copy.svg" alt="copy" width={16} height={16} />
      </button>
    </div>
  );
};

export default CopyToClipboard;
