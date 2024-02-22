import Footer from "@/components/footer";
import Navbar from "@/components/layout-components/navbar";
import { FC } from "react";
import { Outlet } from "react-router-dom";

interface RootLayoutProps {}

const RootLayout: FC<RootLayoutProps> = () => {
  return (
    <div>
      {/* className=" bg-gradient-to-tr from-primary/20 to-secondary/15 " */}
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default RootLayout;
