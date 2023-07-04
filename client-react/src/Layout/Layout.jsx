import { Outlet } from "react-router-dom"
import Navbar from "../components/Layout/Nabar";
import Footer from "../components/Layout/Footer";

const Layout = () => {
  return (
    <div>
        <Navbar/>
      <Outlet  />
      <Footer/>
    </div>
  );
}

export default Layout
