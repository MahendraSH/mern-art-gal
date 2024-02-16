import { FC } from "react";
import { Button } from "@/components/ui/button";
import { BoxIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface AuthNavbarProps {}

const AuthNavbar: FC<AuthNavbarProps> = ({}) => {
  return (
    <div className=" flex justify-center items-center h-16 m-0 p-0 shadow-sm shadow-secondary-foreground ">
      <Link to={"/"}>
        <Button variant={"navbar"} className=" text-lg">
          <BoxIcon className="w-5 h-5 mr-2 " /> NavIcon
        </Button>
      </Link>
    </div>
  );
};

export default AuthNavbar;
