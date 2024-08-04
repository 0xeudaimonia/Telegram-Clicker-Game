"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

function Clock(props: { classname: string | undefined }) {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const currentTime = new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false, // This will remove the AM/PM;
      });
      setCurrentTime(currentTime);
    };
    updateTime();
    const intervalId = setInterval(updateTime, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={props.classname}>
      <h5>{currentTime}</h5>
      <Image
        className="h-5 bg-gray-900 mt-0.5 ml-0.5"
        src="/i_icon.svg"
        alt="clock"
        width={20}
        height={20}
      />
    </div>
  );
}

export default Clock;
