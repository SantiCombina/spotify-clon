import {Route, Routes} from "react-router-dom";

import {Home} from "./views/home";

function App() {
    return (
        <div className="min-h-[100dvh] bg-neutral-950 text-gray-300 flex flex-col justify-center items-center">
            <Routes>
                <Route element={<Home />} path="/" />
            </Routes>
        </div>
    );
}

export default App;
