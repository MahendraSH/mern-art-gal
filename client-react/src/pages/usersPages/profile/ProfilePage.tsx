import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useGetProfileDetailsQuery } from "@/app/features/user/auth-api";
import { FC } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Edit, MoveRight } from "lucide-react";

interface ProfilePageProps { }

const ProfilePage: FC<ProfilePageProps> = () => {
  const { isLoading, isSuccess, data } = useGetProfileDetailsQuery();
  if (isLoading) {
    return (
      <div className=" space-x-4 w-full flex justify-center items-center ">
        <Skeleton className=" w-1/3 aspect-square rounded-full" />
        <div className="space-y-2 w-1/3">
          <Skeleton className=" w-full" />
          <Skeleton className=" w-full" />
        </div>
      </div>
    );
  }
  if (isSuccess) {
    return (
      <div className="w-full flex justify-center items-center">
        <Card className=" md:flex  md:w-[calc(55%)] w-full ">
          <CardContent className="w-1/2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="w-full h-full">
                  <Avatar className="w-full h-full rounded-full relative">
                    <AvatarImage src={data.user.avatar?.url} className=" " />
                    <AvatarFallback className=" w-full aspect-square text-4xl">
                      {data.user?.userName?.slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                </TooltipTrigger>
                <TooltipContent
                  className=" bg-background flex  "
                  align="end"
                  side="top"
                  sideOffset={-80}
                >
                  <Edit />
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardContent>
          <div className=" w-1/2">
            <CardHeader className=" space-y-6">
              <CardTitle> {data.user.userName} </CardTitle>
              <CardDescription className="font-semibold">
                {data.user.email}
              </CardDescription>
            </CardHeader>
            <CardFooter className="  flex flex-col space-y-4 mt-6">
              <div className=" w-full flex space-x-4">
                Role <MoveRight className=" w-5 h-5 mx-4 " />
                {data.user.role}
              </div>
              <div className=" w-full flex space-x-4">
                createdAt <MoveRight className=" w-5 h-5 mx-4 " />{" "}
                {new Date(data.user.createdAt).toDateString()}
              </div>
            </CardFooter>
          </div>
        </Card>
      </div>
    );
  }
};

export default ProfilePage;
