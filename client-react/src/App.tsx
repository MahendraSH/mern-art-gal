import AuthLayout from "@/layouts/AuthLayout";
import AuthenticatedUserRoutes from "@/layouts/AuthenticatedUserRoutes";
import OnlyAdminRoutes from "@/layouts/OnlyAdminRoutes";
import RootLayout from "@/layouts/RootLayout";
import Dashboard from "@/pages/Admin/Dashboard";
import ContactsPage from "@/pages/Contacts/ContactsPage";
import HomePage from "@/pages/HomePage";
import PageNotFound from "@/pages/Page-Not-Found";
import SignIn from "@/pages/auth/SignIn";
import SignUp from "@/pages/auth/SignUp";
import BlogList from "@/pages/usersPages/blog/BlogList";
import GalleryList from "@/pages/usersPages/galleryPages/GalleryList";
import EditProfile from "@/pages/usersPages/profile/EditProfile";
import ProfilePage from "@/pages/usersPages/profile/ProfilePage";
import UserDashboardPage from "@/pages/usersPages/profile/UserDashboardPage";
import TasksList from "@/pages/usersPages/task/TasksList";
import { FC } from "react";
import { Route, Routes } from "react-router-dom";

interface AppProps { }

const App: FC<AppProps> = () => {
  return (
    <>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<HomePage />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/auth/sign-in" element={<SignIn />} />
          <Route path="/auth/sign-up" element={<SignUp />} />
        </Route>
        <Route element={<AuthenticatedUserRoutes />}>
          {/*  user profile  */}

          <Route path="/me/profile" element={<ProfilePage />} />
          <Route path="/me/user-dashboard" element={<UserDashboardPage />} />
          <Route path="/me/profile/edit" element={<EditProfile />} />
          <Route path="/me/profile/edit/image" element={<EditProfile />} />
          {/*  blog routes  */}
          <Route path="/blog/blogs" element={<BlogList />} />
          {/*  task routes  */}
          <Route path="/task/tasks" element={<TasksList />} />
          {/*  gallery routes  */}
          <Route path="/gallery/galleries" element={<GalleryList />} />
          {/*  contact routes */}
          <Route path="/contacts" element={<ContactsPage />} />
        </Route>
        <Route element={<OnlyAdminRoutes />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export default App;
