import { useCallback, useEffect, useState } from "react";
import Image from "next/image";

const ReferralCode = ({ referralCode }: { referralCode: string }) => {
  const [copySupported, setCopySupported] = useState(false);

  useEffect(() => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      setCopySupported(true);
    }
  }, []);

  const handleCopy = useCallback(() => {
    if (!copySupported) {
      const textArea = document.createElement("textarea");
      textArea.value = `${process.env.NEXT_PUBLIC_TELGRAM_BOT_LINK}?start=${referralCode}`;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      console.log("Copied to clipboard");
    } else {
      navigator.clipboard
        .writeText(`${process.env.NEXT_PUBLIC_TELGRAM_BOT_LINK}?start=${referralCode}`)
        .then(() => {
          console.log("Copied to clipboard");
        })
        .catch((err) => {
          console.error("Failed to copy: ", err);
        });
    }
  }, [copySupported, referralCode]);

  return (
    <div className="flex justify-center text-center items-center gap-3 bottom-[5.5rem] fixed w-full px-4 right-0">
      <div className="card bg-[#FABB1E] p-3 border border-1 border-[#1F1F1F] rounded-lg bg-[url(/mainButton_Gold.png)] w-full">
        <p className="m-0 text-[#002050]">
          <b>
            {referralCode
              ? `Invite with code: ${referralCode}`
              : "Generating referral code..."}
          </b>
        </p>
      </div>
      <button
        className="btn bg-[url(/bgButton.png)] bg-no-repeat bg-cover btn-primary"
        onClick={handleCopy}
        disabled={!referralCode}
      >
        <Image src="/copy.svg" alt="copy" width={16} height={16} />
      </button>
    </div>
  );
};

export default ReferralCode;
