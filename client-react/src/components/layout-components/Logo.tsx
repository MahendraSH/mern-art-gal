import { FC } from "react";

import { Button } from "@/components/ui/button";
import { BoxIcon } from "lucide-react";
import { Link } from "react-router-dom";
interface LogoProps {}

const Logo: FC<LogoProps> = () => {
  return (
    <Link to={"/"}>
      <Button variant={"navbar"} className=" text-lg">
        <BoxIcon className="w-5 h-5 mr-2 " /> ArtGal
      </Button>
    </Link>
  );
};

export default Logo;
