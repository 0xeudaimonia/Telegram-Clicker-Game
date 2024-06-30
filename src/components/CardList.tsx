import Image from "next/image";

interface CardListProps {
  data: {
    title: string;
    points: string;
    imageSrc: string;
  }[];
}

const CardList: React.FC<CardListProps> = ({ data }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-white mb-4">
      {data.map((item, index) => (
        <div
          key={index}
          className="card bg-[#0040A1] bg-[url(/scoreList.png)] bg-no-repeat bg-cover p-3 rounded-lg"
        >
          <div className="flex gap-3 items-center">
            {index < 3 ? (
              <p className="text-base m-0 w-4">
                {index === 0 ? "🥇" : index === 1 ? "🥈" : "🥉"}
              </p>
            ) : (
              <p className="text-base m-0 w-4 text-center">{index + 1}</p>
            )}
            <Image
              src={item.imageSrc}
              alt={item.title}
              width={28}
              height={28}
              className="rounded-full"
            />
            <div>
              <h3 className="text-base">{item.title}</h3>
              <div className="flex gap-2">
                <Image src={"/coin.svg"} alt={"coin"} width={12} height={12} />
                <p className="text-[10px] m-0">{item.points}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardList;
