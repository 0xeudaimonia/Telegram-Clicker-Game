import Link from "next/link";

interface ButtonProps {
  label: string;
  onClick?: () => void;
  href?: string;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, href, className }) => {
  const buttonClass = `${className || ""}`;

  if (href) {
    return (
      <Link href={href}>
        <a className={buttonClass}>{label}</a>
      </Link>
    );
  }

  return (
    <button className={buttonClass} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
