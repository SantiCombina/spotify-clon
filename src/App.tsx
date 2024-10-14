import {Route, Routes} from "react-router-dom";

import {Layout} from "./components/layout/layout";
import {AlbumDetail} from "./views/album-detail";
import {ArtistDetail} from "./views/artist-detail";
import {Artist} from "./views/artists";
import {FavoriteSongs} from "./views/favorite-songs";
import {Login} from "./views/login";

import {FavoritesProvider} from "@/context/favoritesContext";

function App() {
    return (
        <FavoritesProvider>
            <Routes>
                <Route element={<Login />} path="/login" />
                <Route element={<Layout />}>
                    <Route element={<Artist />} path="/" />
                    <Route element={<ArtistDetail />} path="/artist-detail/:artistId" />
                    <Route element={<AlbumDetail />} path="/album-detail/:albumId" />
                    <Route element={<FavoriteSongs />} path="/favorite-songs" />
                </Route>
            </Routes>
        </FavoritesProvider>
    );
}

export default App;
