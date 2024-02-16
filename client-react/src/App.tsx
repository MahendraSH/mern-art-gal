import AuthLayout from "@/layouts/AuthLayout";
import AuthenticatedUserRoutes from "@/layouts/AuthenticatedUserRoutes";
import OnlyAdminRoutes from "@/layouts/OnlyAdminRoutes";
import RootLayout from "@/layouts/RootLayout";
import Dashboard from "@/pages/Admin/Dashboard";
import HomePage from "@/pages/HomePage";
import SignIn from "@/pages/auth/SignIn";
import SignUp from "@/pages/auth/SignUp";
import BlogList from "@/pages/usersPages/blog/BlogList";
import GalleryList from "@/pages/usersPages/galleryPages/GalleryList";
import TasksList from "@/pages/usersPages/task/TasksList";
import { FC } from "react";
import { Route, Routes } from "react-router-dom";

interface AppProps {}

const App: FC<AppProps> = ({}) => {
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
          <Route path="/blog/blogs" element={<BlogList />} />
          <Route path="/task/tasks" element={<TasksList />} />
          <Route path="/gallery/galleries" element={<GalleryList />} />
        </Route>
        <Route element={<OnlyAdminRoutes />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
