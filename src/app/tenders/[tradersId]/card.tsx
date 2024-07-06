import Image from "next/image";

interface CardListProps {
  data: {
    title: string;
    points: string;
    active: boolean;
  }[];
}

export const Card: React.FC<CardListProps> = ({ data }) => {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 gap-4" id="tender">
      {data.map((item, index) => (
        <div
          className={`card border px-3 py-1 text-center tender_cards ${
            item.active ? "" : "opacity-35"
          }`}
          key={index}
        >
          <h5>{item.title}</h5>
          <Image
            src="/coin.svg"
            alt="coin"
            height="24"
            width="24"
            className="mx-auto my-3"
          />
          <h5>{item.points}</h5>
        </div>
      ))}
    </div>
  );
};

export default Card;
