import { FC } from "react";
import Logo from "./Logo";

interface AuthNavbarProps {}

const AuthNavbar: FC<AuthNavbarProps> = () => {
  return (
    <div className=" flex justify-center items-center h-16 m-0 p-0 shadow-sm shadow-secondary-foreground ">
      <Logo />
    </div>
  );
};

export default AuthNavbar;
