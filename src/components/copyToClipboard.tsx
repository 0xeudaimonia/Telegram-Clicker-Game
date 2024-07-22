// components/ReferralCode.js
"use client";
import { useEffect, useState, useCallback } from "react";
import Image from "next/image";

const ReferralCode = ({ userId }: { userId: string }) => {
  const [referralCode, setReferralCode] = useState("");

  useEffect(() => {
    const fetchReferralCode = async () => {
      try {
        const response = await fetch(`/api/referralCode?userId=${userId}`);
        const data = await response.json();
        if (response.ok) {
          setReferralCode(data.code);
        } else if (data.error === "Referral code not found") {
          // Generate a new referral code if it doesn't exist
          const response = await fetch("/api/referralCode", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId }),
          });
          const newData = await response.json();
          if (response.ok) {
            setReferralCode(newData.token);
          } else {
            console.error("Error creating referral code:", newData.error);
          }
        } else {
          console.error("Error fetching referral code:", data.error);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchReferralCode();
  }, [userId]);

  const handleCopy = useCallback(() => {
    navigator.clipboard
      .writeText(referralCode)
      .then(() => {
        console.log("Copied to clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  }, [referralCode]);

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
