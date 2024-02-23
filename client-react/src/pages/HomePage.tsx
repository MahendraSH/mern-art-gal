import { useGetProfileDetailsQuery } from "@/app/features/user/auth-api";
import Hero from "@/components/homePageComponents/hero";
import LoaderSpinner from "@/components/ui/loader-spinner";
import { FC } from "react";

interface HomePageProps {}

const HomePage: FC<HomePageProps> = () => {
  const { isLoading, data, isSuccess } = useGetProfileDetailsQuery(null);

  if (isLoading) {
    return (
      <div className=" w-full h-full flex justify-center items-center">
        <LoaderSpinner size={"icon"} />
      </div>
    );
  }

  return (
    <div className=" w-full min-h-screen flex justify-center items-center  bg-gradient-to-tr from-primary/10 to-secondary/10 py-16 ">
      <Hero user={data} isSuccess={isSuccess} />
    </div>
  );
};

export default HomePage;
