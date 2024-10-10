import { Route, Routes } from "react-router-dom";
import { Home } from "./views/home";
import { Artist } from "./views/artists";
import { Login } from "./views/login";
import { AlbumDetail } from "./views/album-detail"; // Asegúrate de importar AlbumDetail
import { ArtistDetail } from "./views/artist-detail";
import { Layout } from "./components/layout/layout";
import { FavoritesProvider } from "@/context/favoritesContext";
import { FavoriteSongs } from "./views/favorite-songs";

function App() {
    return (
        <FavoritesProvider>
            <Routes>
                <Route element={<Login />} path="/login" />
                <Route element={<Layout />}>
                    <Route element={<Home />} path="/" />
                    <Route element={<Artist />} path="/artists" />
                    <Route element={<ArtistDetail />} path="/artist-detail/:artistId" />
                    <Route element={<AlbumDetail />} path="/album-detail/:albumId" />
                    <Route element={<FavoriteSongs />} path="/favorite-songs" />
                </Route>
            </Routes>
        </FavoritesProvider>
    );
}

export default App;
