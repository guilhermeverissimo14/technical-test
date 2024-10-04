import SidebarButton from "./Sidebar-button";
import { Card, CardContent } from "./ui/card";

const Header = () => {
    return (
        <Card className="w-full bg-transparent border-transparent ">
            <CardContent className=" flex flex-grow p-5 justify-between items-center ">
                <SidebarButton />
            </CardContent>
        </Card>
    );
}




export default Header;