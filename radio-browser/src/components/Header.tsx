import SidebarButton from "./Sidebar-button";
import { Card, CardContent } from "./ui/card";

const Header = () => {
    return (
        <Card className="w-full bg-transparent border-transparent">
            <CardContent className=" flex pt-3 flex-grow   items-center ">

                <SidebarButton />

                <div className=" w-full flex justify-center">
                    <h1 className="text-white font-bold text-2xl">Radio Browser</h1>
                </div>

            </CardContent>
        </Card>
    );
}




export default Header;