import Footer from "@/components/footer";
import { ModeToggle } from "@/components/mode-toggle";
import { FC } from "react";
import { Outlet } from "react-router-dom";

interface OnlyAdminRoutesProps {}

const OnlyAdminRoutes: FC<OnlyAdminRoutesProps> = () => {
  return (
    <div>
      <Outlet />

      <span className=" fixed bottom-8 right-5 ">
        <ModeToggle />
      </span>
      <Footer />
    </div>
  );
};

export default OnlyAdminRoutes;
