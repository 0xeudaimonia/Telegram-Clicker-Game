import CardList from "./cardList";
import TabelList from "./tabelList";
import CopyToClipboard from "./copyToClipboard";

const cardListData = [
  {
    title: "Пригласить друга",
    points: "+7 000 для вас и вашего друга",
    imageSrc: "/gift.svg",
  },
  {
    title: "Пригласить друга с Telegram Premium",
    points: "+21 000 для вас и вашего друга",
    imageSrc: "/gift-2.svg",
  },
];

const tabelListData = [
  {
    name: "Прораб",
    pointFromFriend: "307 582",
    pointPremium: "615 165",
    imageSrc: "/avatar.jpeg",
  },
  {
    name: "Прораб",
    pointFromFriend: "307 582",
    pointPremium: "615 165",
    imageSrc: "/avatar.jpeg",
  },
  {
    name: "Прораб",
    pointFromFriend: "307 582",
    pointPremium: "615 165",
    imageSrc: "/avatar.jpeg",
  },
  {
    name: "Прораб",
    pointFromFriend: "307 582",
    pointPremium: "615 165",
    imageSrc: "/avatar.jpeg",
  },
  {
    name: "Прораб",
    pointFromFriend: "307 582",
    pointPremium: "615 165",
    imageSrc: "/avatar.jpeg",
  },
];
export default function ReferalPage() {
  return (
    <div className="text-white bg-[url(/background2.png)] pb-20">
      <div className="text-center">
        <h5>Пригласите друзей!</h5>
        <p className="text-[10px]">Вы и ваш друг получите бонусы</p>
      </div>
      <CardList data={cardListData} />

      <h5 className="text-center">Бонус за повышение уровня</h5>
      <TabelList data={tabelListData} />

      <CopyToClipboard />
    </div>
  );
}
