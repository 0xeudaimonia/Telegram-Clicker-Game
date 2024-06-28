import React from "react";
import Link from "next/link";
export default function Navbar() {
  return (
    <div className="navbar flex justify-between items-center bg-white">
      <div className="">
        <button className="btn btn-sm btn-circle btn-ghost">
          {/* back arrow SVG icon */}
          <svg
            height="auto"
            id="Layer_1"
            version="1.1"
            viewBox="0 0 512 512"
            width="512px"
            xmlns="http://www.w3.org/2000/svg"
          >
            <polygon points="352,128.4 319.7,96 160,256 160,256 160,256 319.7,416 352,383.6 224.7,256 " />
          </svg>
        </button>
      </div>
      <div className="">
        <Link href={"/"} className="text-xl">
          Mining
        </Link>
      </div>
      <div className="">
        <button className="btn btn-sm btn-square btn-ghost border rounded-full border-black">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-5 w-5 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
}
