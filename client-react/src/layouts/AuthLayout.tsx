import { useGetProfileDetailsQuery } from "@/app/features/user/auth-api";
import Footer from "@/components/footer";
import AuthNavbar from "@/components/layout-components/auth-navbar";
import { ModeToggle } from "@/components/mode-toggle";
import LoaderSpinner from "@/components/ui/loader-spinner";
import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";
interface AuthLayoutProps {}

const AuthLayout: FC<AuthLayoutProps> = () => {
  const { isLoading, isError, isSuccess } = useGetProfileDetailsQuery();

  if (isLoading) {
    return (
      <div className=" w-full h-full flex justify-center items-center ">
        <LoaderSpinner size={"icon"} />
      </div>
    );
  }
  if (isSuccess) {
    return <Navigate to="/" />;
  }
  if (isError) {
    return (
      <div className="bg-gradient-to-br from-primary/15 via-secondary/15   to-muted   ">
        <AuthNavbar />
        <main className=" min-h-screen mt-16 mb-16  ">
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

export default AuthLayout;
