"use client";
import Image from "next/image";
import { useState } from "react";
import Card from "../app/card";

export default function Home() {
  return (
    <main className="text-white pb-12 bg-[url(/background2.png)]">
      <Card />
    </main>
  );
}
