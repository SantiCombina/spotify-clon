import {useNavigate} from "react-router-dom";

import {useFavorites} from "@/context/favoritesContext";
import {Button} from "@/components/ui/button";

export function FavoriteSongs() {
    const navigate = useNavigate();

    const {favoriteSongs} = useFavorites();

    if (favoriteSongs.length === 0) {
        return <div className="text-center">No tienes canciones favoritas.</div>;
    }

    return (
        <div className="bg-[#121212] rounded-lg flex flex-col p-6 overflow-auto h-[calc(100vh-6rem)]">
            <span className="mb-4 text-3xl font-bold">Canciones Favoritas</span>
            <ul className="flex flex-col gap-1">
                {favoriteSongs.map((song) => (
                    <li key={song.id} className="flex items-center justify-between">
                        <div>
                            <strong>{song.name}</strong> - {song.artist} (Álbum:{" "}
                            {song.albumName || "Nombre no disponible"})
                        </div>
                        <Button onClick={() => navigate(`/album-detail/${song.albumId}`)}>Ver Álbum</Button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
