import {useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";

import apiController from "@/controllers/api-controller";
import {useFavorites} from "@/context/favoritesContext";
import {Button} from "@/components/ui/button";

export function AlbumDetail() {
    const [album, setAlbum] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    const {favoriteSongs, toggleFavoriteSong} = useFavorites();
    const {albumId} = useParams<{albumId: string}>();

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
        return <div className="text-center">Cargando...</div>;
    }

    if (!album) {
        return <div className="text-center">No se pudo cargar la información del álbum.</div>;
    }

    const {name: albumName, artists, tracks} = album;

    return (
        <div className="bg-[#121212] rounded-lg flex flex-col p-6 overflow-auto h-[calc(100vh-6rem)] gap-2">
            <div className="flex items-center gap-4">
                <img
                    alt={albumName || "Álbum desconocido"}
                    className="rounded-lg"
                    src={album.images && album.images.length > 0 ? album.images[0].url : "/path/to/default-image.png"}
                    width={200}
                />
                <div className="flex flex-col gap-4">
                    <span className="text-6xl font-extrabold">{albumName || "Nombre no disponible"}</span>

                    <span className="font-semibold">{artists.map((artist: any) => artist.name).join(", ")}</span>
                </div>
            </div>
            <div className="flex gap-4">
                <Button variant={"secondary"} onClick={() => navigate("/favorite-songs")}>
                    Canciones Favoritas
                </Button>
                <Button variant={"secondary"} onClick={() => navigate(`/artist-detail/${artists[0].id}`)}>
                    Volver al artista
                </Button>
            </div>
            <span className="text-xl font-semibold">Temas:</span>
            <ul className="flex flex-col gap-1">
                {tracks.items.map((track: any) => (
                    <li key={track.id} className="flex items-center justify-between">
                        {track.name || "Nombre no disponible"}
                        <Button
                            className="text-[#1DB954]"
                            onClick={() =>
                                toggleFavoriteSong({
                                    id: track.id,
                                    name: track.name,
                                    artist: artists[0].name,
                                    albumId: album.id,
                                    albumName: albumName,
                                })
                            }
                        >
                            {favoriteSongs.some((fav) => fav.id === track.id)
                                ? "Eliminar de Favoritos"
                                : "Agregar a Favoritos"}
                        </Button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
