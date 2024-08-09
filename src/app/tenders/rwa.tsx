import Image from "next/image";

interface DataType {
  image: string;
  title: string;
  level: string;
  amount: string;
  exchange: string;
}
const data: DataType[] = [
  {
    image: "/greenblock.png",
    title: "Name",
    level: "12",
    amount: "513 000",
    exchange: "513 000",
  },
  {
    image: "/greenblock.png",
    title: "Name",
    level: "12",
    amount: "513 000",
    exchange: "513 000",
  },
  {
    image: "/greenblock.png",
    title: "Name",
    level: "12",
    amount: "513 000",
    exchange: "513 000",
  },
  {
    image: "/greenblock.png",
    title: "Name",
    level: "12",
    amount: "513 000",
    exchange: "513 000",
  },
];
const RWA: React.FC = () => {
  return (
    <div className="flex flex-wrap ">
      {data.map((item, index) => (
        <div
          className="bg-stone-800 rounded-xl border-x-2 border-blue-950 w-[45%] m-2 p-3"
          key={index}
        >
          <div className="flex  space-x-3">
            <Image
              src={item.image}
              alt={item.title}
              width={60}
              height={40}
              className="mb-2 rounded-xl"
            />
            <div className="flex flex-col mb-2">
              <h6 style={{ flexBasis: "60%" }} className="mb-2 ">
                {" "}
                {item.title}
              </h6>

              <span className="text-xs" style={{ flexBasis: "50%" }}>
                Exchange
              </span>
              <div className="flex ">
                <Image
                  src="/uparrowicon.png"
                  alt="arrow"
                  width={16}
                  height={16}
                  className="h-3 mt-0.5 mr-1"
                />
                <span className="text-xs">{item.exchange}</span>
              </div>
            </div>
          </div>
          <hr />
          <div className="flex">
            <span className="text-xs pt-2">Level {item.level}</span>
            <span className="h-4 p-0">|</span>
            <div className="flex mx-1">
              <Image
                src="/uparrowicon.png"
                alt="arrow"
                width={16}
                height={16}
                className="h-3 mt-2.5 mr-1"
              />
              <span className="text-xs pt-2">{item.amount}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default RWA;
