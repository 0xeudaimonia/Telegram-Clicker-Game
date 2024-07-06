import Card from "./card";
import Image from "next/image";
import Button from "@components/Button";

const cardListData = [
  {
    title: "День 1",
    points: "1K",
    active: false,
  },
  {
    title: "День 2",
    points: "2K",
    active: true,
  },
  {
    title: "День 3",
    points: "3K",
    active: false,
  },
  {
    title: "День 4",
    points: "4K",
    active: false,
  },
  {
    title: "День 5",
    points: "1K",
    active: false,
  },
  {
    title: "День 6",
    points: "2K",
    active: false,
  },
  {
    title: "День 7",
    points: "3K",
    active: false,
  },
  {
    title: "День 8",
    points: "4K",
    active: false,
  },
  {
    title: "День 8",
    points: "4K",
    active: false,
  },
  {
    title: "День 8",
    points: "4K",
    active: false,
  },
  {
    title: "День 8",
    points: "4K",
    active: false,
  },
  {
    title: "День 8",
    points: "4K",
    active: false,
  },
];

export default function TradersIdPage() {
  return (
    <div className="text-white bg-[url(/background2.png)] pb-20">
      <div className="text-center">
        <Image
          src="/calendar.svg"
          alt="calendar"
          height="80"
          width="80"
          className="shadow-2xl shadow-[#2496FF] mx-auto"
        />
        <h1 className="fw-bolder mt-5 mb-2">Ежедневная награда</h1>
        <p className="text-[10px] max-w-64 mx-auto leading-4">
          Забирайте монеты за ежедневный вход в игру без пропусков. Кнопку
          “Забрать” нужно нажимать ежедневно, иначе счётчик дней начнётся заново
        </p>
      </div>

      <Card data={cardListData} />

      <Button
        label="Забрать"
        className="btn mt-16 text-base bg-[url(/bgButton.png)] bg-cover bg-center bg-no-repeat btn-primary text-white w-full"
      />
    </div>
  );
}
