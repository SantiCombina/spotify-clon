import {useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";

import apiController from "@/controllers/api-controller";
import {useFavorites} from "@/context/favoritesContext";
import {Button} from "@/components/ui/button";

export function ArtistDetail() {
    const [artist, setArtist] = useState<any>(null);
    const [albums, setAlbums] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const {artistId} = useParams<{artistId: string}>();

    const {favoriteArtists, toggleFavorite} = useFavorites();

    useEffect(() => {
        const fetchArtistData = async () => {
            setLoading(true);
            if (artistId) {
                try {
                    const data = await apiController.getArtist(artistId);

                    setArtist(data);

                    const albumsData = await apiController.getAlbumsByArtist(artistId);

                    setAlbums(albumsData);
                } catch (error) {
                    console.error("Error fetching artist data:", error);
                }
            }
            setLoading(false);
        };

        fetchArtistData();
    }, [artistId]);

    if (loading) {
        return <div className="text-center">Cargando...</div>;
    }

    if (!artist) {
        return <div className="text-center">No se pudo cargar la información del artista.</div>;
    }

    const imageUrl = artist.images && artist.images.length > 0 ? artist.images[0].url : "/path/to/default-image.png";

    return (
        <div className="flex flex-col gap-2 max-h-[calc(100vh-6rem)] w-full">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <img
                        alt={artist.name || "Artista desconocido"}
                        className="w-24 h-24 rounded-full shadow-lg"
                        src={imageUrl}
                    />
                    <span className="text-3xl font-bold">{artist.name || "Nombre no disponible"}</span>
                </div>
                <div className="flex gap-4">
                    <Button className="bg-green-500 hover:bg-green-500/90" onClick={() => toggleFavorite(artist)}>
                        {favoriteArtists.some((fav) => fav.id === artist.id)
                            ? "Eliminar de Favoritos"
                            : "Agregar a Favoritos"}
                    </Button>

                    <Button variant={"secondary"} onClick={() => navigate("/")}>
                        Volver a la búsqueda de artistas
                    </Button>
                </div>
            </div>

            <div className="flex flex-wrap justify-center h-screen overflow-auto bg-[#121212] rounded-lg p-4">
                {albums.length > 0 ? (
                    albums.map((album) => (
                        <div
                            key={album.id}
                            className="album flex flex-col cursor-pointer hover:bg-[#1E1E1E] h-fit rounded-lg p-3 max-w-[200px]"
                            onClick={() => navigate(`/album-detail/${album.id}`)}
                        >
                            <img
                                alt={album.name || "Álbum desconocido"}
                                className="rounded-lg album-image"
                                src={album.images[0]?.url || "/path/to/default-album-image.png"}
                                width={200}
                            />
                            <span className="text-lg font-semibold">{album.name || "Nombre no disponible"}</span>
                            <span className="text-gray-400">
                                Año: {album.release_date.split("-")[0] || "No disponible"}
                            </span>
                        </div>
                    ))
                ) : (
                    <span>No se encontraron álbumes.</span>
                )}
            </div>
        </div>
    );
}
