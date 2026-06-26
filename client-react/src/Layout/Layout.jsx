import { Outlet } from "react-router-dom"
import Navbar from "../components/Layout/Nabar";
import Footer from "../components/Layout/Footer";
import CommandPalette from "../components/Layout/CommandPalette";

const Layout = () => {
  return (
    <div className="relative">
      <Navbar/>
      <Outlet  />
      <Footer/>
      <CommandPalette />
    </div>
  );
}

export default Layout
