"use client";

import { useState } from "react";
import { MenuIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

const SidebarButton = () => {

    const [openSidebar, setOpenSidebar] = useState(true)

    return (
        <Sheet >
            <SheetTrigger asChild>
                <Button
                    size="icon"
                    variant="outline"
                >
                    <MenuIcon />
                </Button>
            </SheetTrigger>

            <SheetContent
                className="bg-[#18181b] w-[40%] border-transparent"
                side="left"
            >
                <Button>

                </Button>
                <h1 >Teste</h1>
            </SheetContent>
        </Sheet>
    );
}

export default SidebarButton;