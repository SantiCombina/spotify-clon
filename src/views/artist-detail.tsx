import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiController from "@/controllers/api-controller";
import { useFavorites } from "@/context/favoritesContext";

export function ArtistDetail() {
    const { artistId } = useParams<{ artistId: string }>();
    const navigate = useNavigate();
    const [artist, setArtist] = useState<any>(null);
    const [albums, setAlbums] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const { favoriteArtists, toggleFavorite } = useFavorites();

    useEffect(() => {
        const fetchArtistData = async () => {
            setLoading(true);
            if (artistId) {
                const data = await apiController.getArtist(artistId);
                setArtist(data);

                const albumsData = await apiController.getAlbumsByArtist(artistId);
                setAlbums(albumsData);
            }
            setLoading(false);
        };

        fetchArtistData();
    }, [artistId]);

    if (loading) {
        return <div className="text-white text-center">Cargando...</div>;
    }

    if (!artist) {
        return <div className="text-white text-center">No se pudo cargar la información del artista.</div>;
    }

    const imageUrl = artist.images && artist.images.length > 0 ? artist.images[0].url : "/path/to/default-image.png";

    return (
        <div className="bg-[#121212] text-white min-h-screen p-6">
            <div className="flex items-center mb-6">
                <img
                    src={imageUrl}
                    alt={artist.name || "Artista desconocido"}
                    className="artist-image rounded-full w-24 h-24 mr-4 shadow-lg"
                />
                <h1 className="text-3xl font-bold">{artist.name || "Nombre no disponible"}</h1>
            </div>
    
            <button
                onClick={() => toggleFavorite(artist)} 
                className="mt-4 bg-[#1DB954] text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-[#1AAE3D] transition-colors duration-200"
            >
                {favoriteArtists.some(fav => fav.id === artist.id) ? "Eliminar de Favoritos" : "Agregar a Favoritos"}
            </button>
    
            <h2 className="text-xl font-semibold mb-2">Álbumes:</h2>
            <div className="albums grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {albums.length > 0 ? (
                    albums.map(album => (
                        <div
                            key={album.id}
                            className="album bg-[#1F1F1F] rounded-lg p-4 hover:bg-gray-700 transition duration-200"
                            onClick={() => navigate(`/album-detail/${album.id}`)} // Navegar a la vista de detalles del álbum
                        >
                            <img
                                src={album.images[0]?.url || "/path/to/default-album-image.png"}
                                alt={album.name || "Álbum desconocido"}
                                className="album-image rounded-lg mb-2"
                            />
                            <h3 className="text-lg font-semibold">{album.name || "Nombre no disponible"}</h3>
                            <p className="text-gray-400">Año: {album.release_date.split("-")[0] || "No disponible"}</p>
                        </div>
                    ))
                ) : (
                    <p>No se encontraron álbumes.</p>
                )}
            </div>
            <div className="flex justify-center mt-4">
                <button
                    onClick={() => navigate("/artists")} // Navegar a la vista de búsqueda de artistas
                    className="bg-[#1DB954] text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-[#1AAE3D] transition-colors duration-200"
                >
                    Volver a la búsqueda de artistas
                </button>
            </div>
        </div>
    );
    
}
