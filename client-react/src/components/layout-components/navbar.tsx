import { useGetProfileDetailsQuery } from "@/app/features/user/auth-api";
import AvatarDropDown from "@/components/layout-components/avatar-drop-down";
import { Button } from "@/components/ui/button";
import LoaderSpinner from "@/components/ui/loader-spinner";
import { useScrollTop } from "@/hooks/use-scroll-top";
import { cn } from "@/lib/utils";
import { FC } from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";

interface NavbarProps {}

const Navbar: FC<NavbarProps> = () => {
  const isScrolled = useScrollTop();
  const { isLoading, data: user } = useGetProfileDetailsQuery();
  return (
    <>
      <div
        className={cn(
          " navbar  flex justify-between h-16 m-0 p-0   items-center  fixed top-0 w-full z-50    bg-background text-foreground ",
          isScrolled && " shadow-sm shadow-muted  border-b-2"
        )}
      >
        <div className="ml-3 ">
          <Logo />
        </div>

        <div className=" flex md:gap-x-5 gap-x-3  mr-5">
          {isLoading ? (
            <>
              <LoaderSpinner />
            </>
          ) : (
            <>
              {user?.user._id ? (
                <>
                  <AvatarDropDown user={user} />
                </>
              ) : (
                <>
                  <Link to="/auth/sign-in">
                    <Button variant={"default"} size={"default"}>
                      Sign In
                    </Button>
                  </Link>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
