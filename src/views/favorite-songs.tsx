import { useFavorites } from "@/context/favoritesContext";
import { useNavigate } from "react-router-dom";

export function FavoriteSongs() {
    const { favoriteSongs } = useFavorites();
    const navigate = useNavigate();

    if (favoriteSongs.length === 0) {
        return <div className="text-white text-center">No tienes canciones favoritas.</div>;
    }

    return (
        <div className="bg-[#121212] text-white min-h-screen p-6">
            <h1 className="text-3xl font-bold mb-4">Canciones Favoritas</h1>
            <ul className="list-disc pl-5">
                {favoriteSongs.map((song) => (
                    <li key={song.id} className="mb-2 flex justify-between items-center">
                        <div>
                            <strong>{song.name}</strong> - {song.artist} (Álbum: {song.albumName || "Nombre no disponible"})
                        </div>
                        <button
                            onClick={() => navigate(`/album-detail/${song.albumId}`)} // Navegar a la vista del álbum
                            className="text-[#1DB954] ml-2"
                        >
                            Ver Álbum
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
