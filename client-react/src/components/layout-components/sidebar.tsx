import { FC, useState } from "react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { SidebarIcon, Square } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarProps {}

const Sidebar: FC<SidebarProps> = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Sheet open={isOpen} onOpenChange={() => setIsOpen(false)}>
        <Button variant={"ghost"} size={"icon"} onClick={() => setIsOpen(true)}>
          <SidebarIcon className=" h-6 w-6 my-auto  " />
        </Button>
        <SheetContent className=" w-[90%]" side={"left"}>
          <SheetHeader className="w-full">
            <SheetTitle>
              <Button variant={"navbar"} size={"sidebar"}>
                <Square className=" w-5 h-5 mr-2" /> NavIcon
              </Button>
            </SheetTitle>
            <div className="flex  justify-start flex-col gap-y-2  w-full "></div>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Sidebar;
