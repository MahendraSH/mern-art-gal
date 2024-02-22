import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { siteConfig } from "@/utils/site-config";
import { MoveRightIcon } from "lucide-react";
import { FC } from "react";
import { Link } from "react-router-dom";

interface HomePageProps {}

const HomePage: FC<HomePageProps> = () => {
  return (
    <div className=" w-full min-h-screen flex justify-center items-center">
      <Card className=" w-full  min-h-96 lg:flex  justify-stretch   gap-4 ">
        <CardHeader className="lg:w-1/2 space-y-5">
          <CardTitle className=" text-5xl"> {siteConfig.name} </CardTitle>
          <CardDescription className=" text-2xl">
            {" "}
            {siteConfig.description1}
          </CardDescription>
          <CardDescription className=" text-lg">
            {siteConfig.description2}
          </CardDescription>
          <div className="  py-12 w-full  flex lg:justify-start justify-center items-center">
            <Link to={"/auth/sign-up"}>
              <Button variant={"gradient"} size={"lg"}>
                GetStarted <MoveRightIcon className=" w-5 h-5  ml-3" />
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent className=" lg:w-1/2">
          <img
            src={siteConfig.heroImageUrl}
            alt="hero Image"
            className=" w-full  aspect-video  border rounded-lg  m-8 mx-auto"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default HomePage;
