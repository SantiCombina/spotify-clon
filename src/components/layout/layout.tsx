import {Outlet} from "react-router-dom";

import {Footer} from "./footer";

export function Layout() {
    return (
        <div className="h-[100dvh] bg-[#000] text-[#FFF] flex flex-col justify-between items-center custom-scrollbar p-2 gap-2">
            <div className="flex-grow w-full">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
}
