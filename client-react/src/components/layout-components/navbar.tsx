import AvatarDropDown from "@/components/layout-components/avatar-drop-down";
import Sidebar from "@/components/layout-components/sidebar";
import { Button } from "@/components/ui/button";
import { useScrollTop } from "@/hooks/use-scroll-top";
import { cn } from "@/lib/utils";
import { FC } from "react";
import { Link } from "react-router-dom";

interface NavbarProps {}

const Navbar: FC<NavbarProps> = ({}) => {
  const isScrolled = useScrollTop();

  return (
    <>
      <div
        className={cn(
          " navbar  flex justify-between h-16 m-0 p-0   items-center  fixed top-0 w-full z-50    bg-background text-foreground ",
          isScrolled && " border-b-2"
        )}
      >
        <div className="ml-3 "></div>
        <div className=" flex md:gap-x-5 gap-x-3  mr-5">
          <>
            <Link to="/auth/sign-in">
              <Button variant={"default"} size={"default"}>
                Sign In
              </Button>
            </Link>
            <Link to={"/auth/sign-up"}>
              <Button variant={"gradient"} size={"default"}>
                Create An Account
              </Button>
            </Link>
          </>
          <>
            <AvatarDropDown />
          </>
          {/* <Sidebar /> */}
        </div>
      </div>
    </>
  );
};

export default Navbar;
