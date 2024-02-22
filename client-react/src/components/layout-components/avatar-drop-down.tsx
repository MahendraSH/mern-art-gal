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
import { FC } from "react";

interface AvatarDropDownProps {}

const AvatarDropDown: FC<AvatarDropDownProps> = () => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className=" rounded-full">
          <Avatar className="ring-0 md:ring-2 w-10 h-10 ">
            <AvatarImage src="" />
            <AvatarFallback>MS</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="  mr-4 w-40">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-muted-foreground" />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem className=" items-center align-middle">
            <span className=" text-xs  mr-auto"> Theme  </span>
            <span className=" mr-2">
              <ModeToggle />
            </span>
          </DropdownMenuItem>

          <DropdownMenuItem> Admin Dashboard </DropdownMenuItem>
          <DropdownMenuItem> Logout </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default AvatarDropDown;
