import { useLogoutUserMutation } from "@/app/features/user/auth-api";
import { ModeToggle } from "@/components/mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getErrorMessage } from "@/lib/utils";
import { UserType } from "@/types/user";
import { FC } from "react";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";

interface AvatarDropDownProps {
  user: UserType;
}

const AvatarDropDown: FC<AvatarDropDownProps> = ({ user }) => {
  const [LogoutUser, { isError, error, isSuccess }] = useLogoutUserMutation();
  const handleLogoutUser = () => {
    LogoutUser();
  };

  if (isError) {
    toast.error(getErrorMessage(error));
  }

  if (isSuccess) {
    return <Navigate to={"/auth/sign-in"} />;
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className=" rounded-full">
          <Avatar className="ring-0 md:ring-2 w-10 h-10 ">
            <AvatarImage src={user.user.avatar?.url} />
            <AvatarFallback>{user.user?.userName?.slice(0, 2)}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="  mr-4 w-40">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-muted-foreground" />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem className=" items-center align-middle">
            <span className=" text-xs  mr-auto"> Theme </span>
            <span className=" mr-2">
              <ModeToggle />
            </span>
          </DropdownMenuItem>
          {user.user.role === "admin" && (
            <DropdownMenuItem> Admin Dashboard </DropdownMenuItem>
          )}
          <DropdownMenuItem onClick={handleLogoutUser}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default AvatarDropDown;
