import { Route, Routes } from "react-router-dom";
import Layout from "./Layout/Layout.jsx";
import Home from "./Pages/Home.jsx";
import About from "./Pages/About.jsx";
import PageNotFound from "./Pages/PageNotFound.jsx";
import Contact from "./Pages/Contact.jsx";
import SignIn from "./Pages/Auth/SignIn.jsx";
import WebFont from "webfontloader";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Galarys from "./Pages/GalaryPages/Galarys.jsx";
import GalaryByid  from "./Pages/GalaryPages/GalaryByid.jsx";
import LoginOnlyRoute from "./utils/LoginOnlyRoute.jsx";
import { loadUser } from "./actions/userActions.js";
import store from "./store.js";
import Logout from "./Pages/Auth/Logout.jsx";
import Myprofile from './components/users/Myprofile.jsx'
import CreatePost from "./Pages/GalaryPages/CreatePost.jsx";
import Dashborad from "./Pages/Admin/Dashborad.jsx";
import AllUsers from "./Pages/Admin/AllUsers.jsx";
export default function App() {
  // const api = import.meta.env.VITE_API_URL;
  // console.log(api)

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route
          element={
            <LoginOnlyRoute
              isAuthenticated={user.isAuthenticated}
              user={user}
            />
          }
        >
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/galary" element={<Galarys />} />
          <Route path="/galary/:id" element={<GalaryByid />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/myprofile" element={<Myprofile />} />
          <Route path="/post/create" element={<CreatePost />} />
        </Route>
        <Route
          element={
            <LoginOnlyRoute
              isAuthenticated={user.isAuthenticated}
              user={user}
              checkAdmin={true}
            />
          }
        >
          <Route path="/admin" element={ <Dashborad/>} />
          <Route path="/admin/users" element={ <AllUsers/>} />
        </Route>
        <Route path="/login" element={<SignIn />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}
