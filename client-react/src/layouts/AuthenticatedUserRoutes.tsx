import { useGetProfileDetailsQuery } from "@/app/features/user/auth-api";
import Footer from "@/components/footer";
import Navbar from "@/components/layout-components/navbar";
import { ModeToggle } from "@/components/mode-toggle";
import LoaderSpinner from "@/components/ui/loader-spinner";
import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";

interface AuthenticatedUserRoutesProps {}

const AuthenticatedUserRoutes: FC<AuthenticatedUserRoutesProps> = () => {
  const { isLoading, isError, isSuccess } = useGetProfileDetailsQuery();
  if (isLoading) {
    return (
      <div className=" w-full h-full flex justify-center items-center">
        <LoaderSpinner size={"icon"} />
      </div>
    );
  }
  if (isError) {
    return <Navigate to="/auth/sign-in" />;
  }
  if (isSuccess) {
    return (
      <div>
        <Navbar />
        <main className=" flex min-h-screen justify-center items-center">
          <Outlet />
        </main>

        <span className=" fixed bottom-8 right-5 ">
          <ModeToggle />
        </span>
        <Footer />
      </div>
    );
  }
};

export default AuthenticatedUserRoutes;
