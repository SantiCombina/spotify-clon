import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";

import {Input} from "@/components/ui/input";
import {useFavorites} from "@/context/favoritesContext";
import apiController from "@/controllers/api-controller";
import {useDebounce} from "@/hooks/use-debounce";
import {Button} from "@/components/ui/button";

export function Artist() {
    const [artists, setArtists] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState("");

    const navigate = useNavigate();

    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    const {favoriteArtists, toggleFavorite} = useFavorites();

    const fetchArtists = async (term: string) => {
        const artistsData = await apiController.getArtists(term);

        if (artistsData) {
            setArtists(artistsData);
        } else {
            alert("No se encontraron artistas");
        }
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    useEffect(() => {
        if (debouncedSearchTerm) {
            fetchArtists(debouncedSearchTerm);
        } else {
            setArtists([]);
        }
    }, [debouncedSearchTerm]);

    return (
        <div className="flex gap-2 max-h-[calc(100vh-6rem)] w-full">
            <div className="flex flex-col items-center flex-1 gap-2">
                <Input
                    className="bg-[#1F1F1F] placeholder:text-[#B3B3B3] text-base px-6 cursor-pointer hover:bg-[#2A2A2A] rounded-3xl border-0 max-w-[474px] min-h-[48px]"
                    placeholder="Buscar artista"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />

                <div className="bg-[#121212] overflow-auto rounded-lg flex flex-col w-full h-screen p-4">
                    <div className="flex flex-wrap justify-center">
                        {artists.length > 0 ? (
                            artists.map((artist) => (
                                <div
                                    key={artist.id}
                                    className="p-3 rounded-lg cursor-pointer hover:bg-[#1E1E1E] flex flex-col items-center gap-2"
                                    onClick={() => navigate(`/artist-detail/${artist.id}`)}
                                >
                                    <img
                                        alt={artist.name}
                                        className="object-cover rounded-full max-w-[160px] max-h-[160px]"
                                        height={160}
                                        src={artist.images[0]?.url}
                                        width={160}
                                    />
                                    <span className="max-w-[160px] flex text-left w-full">{artist.name}</span>

                                    <Button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleFavorite(artist);
                                        }}
                                    >
                                        {favoriteArtists.some((fav) => fav.id === artist.id)
                                            ? "Eliminar de Favoritos"
                                            : "Agregar a Favoritos"}
                                    </Button>
                                </div>
                            ))
                        ) : (
                            <span className="text-[#B3B3B3]">No se encontraron artistas</span>
                        )}
                    </div>
                </div>
            </div>

            <div className="bg-[#121212] flex flex-col p-4 rounded-lg max-h-[calc(100vh-6rem)] mt-14">
                <span className="text-xl font-semibold sticky top-0 bg-[#121212] p-2">Artistas Favoritos</span>
                <div className="flex flex-col items-center overflow-auto">
                    {favoriteArtists.length > 0 ? (
                        favoriteArtists.map((favArtist) => (
                            <div
                                key={favArtist.id}
                                className="p-3 rounded-lg cursor-pointer hover:bg-[#1E1E1E] w-fit flex flex-col items-center gap-2"
                                onClick={() => navigate(`/artist-detail/${favArtist.id}`)}
                            >
                                <img
                                    alt={favArtist.name}
                                    className="object-cover rounded-full max-w-[100px] max-h-[100px]"
                                    height={100}
                                    src={favArtist.images[0]?.url}
                                    width={100}
                                />
                                <span className="max-w-[100px] flex text-left w-full">{favArtist.name}</span>
                            </div>
                        ))
                    ) : (
                        <span className="text-[#B3B3B3]">No hay artistas favoritos</span>
                    )}
                </div>
            </div>
        </div>
    );
}
