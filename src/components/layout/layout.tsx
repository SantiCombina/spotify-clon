import {Outlet} from "react-router-dom";

import {Footer} from "./footer";

export function Layout() {
    return (
        <div className="h-[100dvh] bg-black text-white flex flex-col justify-between items-center custom-scrollbar gap-2 p-2">
            <div className="flex-grow w-full">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
}
