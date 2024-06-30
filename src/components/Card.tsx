import Image from "next/image";

interface CardProps {
  title: string;
  titleColor: string;
  value: string;
  iconSrc?: string;
  additionalIconSrc?: string;
  className?: string;
  paddingClassName?: string;
}

const Card: React.FC<CardProps> = ({
  title,
  titleColor,
  value,
  iconSrc,
  additionalIconSrc,
}) => {
  return (
    <div className={`card mb-4 bg-[#1F1F1F] p-2 sm:px-6`}>
      <h6 className={`text-[10px] ${titleColor}`}>{title}</h6>
      <div className="flex gap-2 justify-center items-center">
        {iconSrc && <Image src={iconSrc} alt="icon" width={24} height={24} />}
        <p className="text-base m-0">{value}</p>
        {additionalIconSrc && (
          <Image
            src={additionalIconSrc}
            alt="additional icon"
            width={24}
            height={24}
          />
        )}
      </div>
    </div>
  );
};

export default Card;
