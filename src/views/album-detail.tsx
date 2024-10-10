import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import apiController from "@/controllers/api-controller";
import { useFavorites } from "@/context/favoritesContext";

export function AlbumDetail() {
    const { albumId } = useParams<{ albumId: string }>();
    const navigate = useNavigate();
    const [album, setAlbum] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const { favoriteSongs, toggleFavoriteSong } = useFavorites(); 

    useEffect(() => {
        const fetchAlbumData = async () => {
            setLoading(true);
            if (albumId) {
                try {
                    const data = await apiController.getAlbumDetails(albumId);
                    setAlbum(data);
                } catch (error) {
                    console.error("Error fetching album details:", error);
                }
            }
            setLoading(false);
        };

        fetchAlbumData();
    }, [albumId]);

    if (loading) {
        return <div className="text-white text-center">Cargando...</div>;
    }

    if (!album) {
        return <div className="text-white text-center">No se pudo cargar la información del álbum.</div>;
    }

    const { name: albumName, artists, tracks } = album;

    return (
        <div className="bg-[#121212] text-white min-h-screen p-6">
            <h1 className="text-3xl font-bold mb-4">{albumName || "Nombre no disponible"}</h1>
            <h2 className="text-xl font-semibold mb-2">Artista(s): {artists.map((artist: any) => artist.name).join(", ")}</h2>
            <Link to="/favorite-songs">
                <button className="bg-[#1DB954] text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-[#1AAE3D] transition-colors duration-200">
                    Canciones Favoritas
                </button>
            </Link>
            <h3 className="text-xl font-semibold mb-2">Temas:</h3>
            <ul className="list-disc pl-5">
                {tracks.items.map((track: any) => (
                    <li key={track.id} className="mb-1 flex justify-between">
                        {track.name || "Nombre no disponible"} 
                        <button
                            onClick={() => toggleFavoriteSong({
                                id: track.id, name: track.name, artist: artists[0].name, albumId: album.id,
                                albumName: albumName
                            })}
                            className="text-[#1DB954] ml-2"
                        >
                            {favoriteSongs.some(fav => fav.id === track.id) ? "Eliminar de Favoritos" : "Agregar a Favoritos"}
                        </button>
                    </li>
                ))}
            </ul>

            <button
                onClick={() => navigate(`/artist-detail/${artists[0].id}`)}
                className="mt-4 bg-[#1DB954] text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-[#1AAE3D] transition-colors duration-200"
            >
                Volver al artista
            </button>
        </div>
    );
}
