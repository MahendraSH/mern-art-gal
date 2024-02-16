import Footer from "@/components/footer";
import Navbar from "@/components/layout-components/navbar";
import { ModeToggle } from "@/components/mode-toggle";
import { FC } from "react";
import { Outlet } from "react-router-dom";

interface RootLayoutProps {}

const RootLayout: FC<RootLayoutProps> = ({}) => {
  return (
    <div>
      {/* className=" bg-gradient-to-tr from-primary/20 to-secondary/15 " */}
      <Navbar />
      <Outlet />
      <span className=" fixed bottom-8 right-5 ">
        <ModeToggle />
      </span>
      <Footer />
    </div>
  );
};

export default RootLayout;
