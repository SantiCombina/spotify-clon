import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import apiController from "@/controllers/api-controller";
import { useDebounce } from "@/hooks/use-debounce";
import { useFavorites } from "@/context/favoritesContext";

export function Artist() {
    const [artists, setArtists] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    const navigate = useNavigate();
    const { favoriteArtists, toggleFavorite } = useFavorites();

    const fetchArtists = async (term: string) => {
        const artistsData = await apiController.getArtists(term);
        if (artistsData) {
            setArtists(artistsData);
        } else {
            alert("No se encontraron artistas");
        }
    };

    useEffect(() => {
        if (debouncedSearchTerm) {
            fetchArtists(debouncedSearchTerm);
        } else {
            setArtists([]);
        }
    }, [debouncedSearchTerm]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className="flex gap-4 max-h-[calc(100vh-6rem)]">
            <div className="flex-1">
                <div className="flex justify-center"> {/* Contenedor para centrar */}
                    <Input
                        className="bg-[#1F1F1F] cursor-pointer hover:bg-[#2A2A2A] rounded-3xl border-0 max-w-[474px] min-h-[48px]"
                        placeholder="Buscar artista"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>
                
                <div className="bg-[#121212] overflow-auto rounded-lg p-6 flex flex-col w-full mt-4">
                    <div className="flex flex-wrap justify-center">
                        {artists.length > 0 ? (
                            artists.map((artist) => (
                                <div
                                    key={artist.id}
                                    onClick={() => navigate(`/artist-detail/${artist.id}`)}
                                    className="p-3 rounded-lg cursor-pointer hover:bg-[#1E1E1E] flex flex-col items-center gap-2"
                                >
                                    <img
                                        alt={artist.name}
                                        className="object-cover rounded-full max-w-[160px] max-h-[160px]"
                                        height={160}
                                        src={artist.images[0]?.url}
                                        width={160}
                                    />
                                    <span className="max-w-[160px] flex text-left w-full">{artist.name}</span>
                                    
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleFavorite(artist);
                                        }}
                                        className="mt-2 bg-[#1DB954] text-white font-semibold py-1 px-2 rounded-lg hover:bg-[#1AAE3D] transition-colors duration-200"
                                    >
                                        {favoriteArtists.some(fav => fav.id === artist.id) ? "Eliminar de Favoritos" : "Agregar a Favoritos"}
                                    </button>
                                </div>
                            ))
                        ) : (
                            <span>No se encontraron artistas</span>
                        )}
                    </div>
                </div>
            </div>
    
            <div className="bg-[#121212] p-4 rounded-lg w-1/4">
                <h2 className="text-xl font-semibold">Artistas Favoritos</h2>
                <div className="flex flex-wrap">
                    {favoriteArtists.length > 0 ? (
                        favoriteArtists.map(favArtist => (
                            <div
                                key={favArtist.id}
                                onClick={() => navigate(`/artist-detail/${favArtist.id}`)}
                                className="p-3 rounded-lg cursor-pointer hover:bg-[#1E1E1E] flex flex-col items-center gap-2"
                            >
                                <img
                                    alt={favArtist.name}
                                    className="object-cover rounded-full max-w-[80px] max-h-[80px]"
                                    height={80}
                                    src={favArtist.images[0]?.url}
                                    width={80}
                                />
                                <span className="max-w-[80px] flex text-left w-full">{favArtist.name}</span>
                            </div>
                        ))
                    ) : (
                        <span>No hay artistas favoritos</span>
                    )}
                </div>
            </div>
        </div>
    );
}
