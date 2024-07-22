"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

const User = () => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const response = await fetch("/api/getCurrentUser");
        const data = await response.json();
        if (response.ok) {
          setUserName(data.userName || "Guest");
        } else {
          console.error("Error:", data.error);
        }
      } catch (error) {
        console.error("Error fetching user name:", error);
      }
    };

    fetchUserName();
  }, []);
  return (
    <div className="p-4 text-white bg-black">
      <div className="flex justify-start items-center mb-4">
        <Image
          src="/avatar.jpeg"
          alt="avatar"
          width={32}
          height={32}
          className="rounded-full"
        />
        <h2 className="text-lg font-bold ms-4">{userName}</h2>
      </div>
    </div>
  );
};

export default User;
