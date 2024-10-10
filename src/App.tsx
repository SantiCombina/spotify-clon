import {Route, Routes} from "react-router-dom";

import {Home} from "./views/home";
import {Artist} from "./views/artists";
import {Login} from "./views/login";
import {ArtistDetail} from "./views/artist-detail";
import {Layout} from "./components/layout/layout";

function App() {
    return (
        <Routes>
            <Route element={<Login />} path="/login" />
            <Route element={<Layout />}>
                <Route element={<Home />} path="/" />
                <Route element={<Artist />} path="/artists" />
                <Route element={<ArtistDetail />} path="/artist-detail" />
            </Route>
        </Routes>
    );
}

export default App;
