import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { FC } from "react";
import { Link } from "react-router-dom";

interface PageNotFoundProps {}

const PageNotFound: FC<PageNotFoundProps> = () => {
  return (
    <div
      className="flex  justify-center items-center h-screen  bg-opacity-50  "
      style={{
        backgroundImage: `url('/not-found.png')`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "300px",
        backgroundPosition: "center",
      }}
    >
      <div className=" flex flex-col justify-center items-center ">
        <h2 className=" text-3xl mb-16  ">404</h2>

        <Link to="/">
          <Button
            variant={"outline"}
            size={"lg"}
            className="capitalize font-medium "
          >
            <Loader2 className="w-8 h-8 mr-3 animate-spin " /> Page not found
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
