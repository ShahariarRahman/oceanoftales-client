import { Link } from "react-router-dom";
import ootBlack from "../../assets/images/logo/oot-black.png";
import oot from "../../assets/images/logo/oot-none.png";
import ootWhite from "../../assets/images/logo/oot-white.png";

type LogoProps = {
  variant?: "white" | "black" | "none";
  className?: string;
};

export default function Logo({ variant, className }: LogoProps) {
  let logo;
  variant === "white"
    ? (logo = ootWhite)
    : variant === "black"
    ? (logo = ootBlack)
    : (logo = oot);
  return (
    <Link to="/">
      <img
        className={`object-contain h-12 rounded-sm hover:scale-105 duration-50 ${className}`}
        src={logo}
        alt=""
      />
    </Link>
  );
}
