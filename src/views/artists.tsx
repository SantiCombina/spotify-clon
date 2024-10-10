import {useState, useEffect} from "react";

import {Input} from "@/components/ui/input";
import apiController from "@/controllers/api-controller";
import {useDebounce} from "@/hooks/use-debounce";

export function Artist() {
    const [artists, setArtists] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState("");

    const debouncedSearchTerm = useDebounce(searchTerm, 500);

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
        <div className="flex flex-col max-h-[calc(100vh-6rem)] items-center justify-between gap-2">
            <Input
                className="bg-[#1F1F1F] cursor-pointer hover:bg-[#2A2A2A] rounded-3xl border-0 max-w-[474px] min-h-[48px]"
                placeholder="Buscar artista"
                value={searchTerm}
                onChange={handleSearchChange}
            />
            <div className="bg-[#121212] overflow-auto rounded-lg p-6 flex flex-col w-full">
                <div className="flex flex-wrap justify-center">
                    {artists.length > 0 ? (
                        artists.map((artist) => (
                            <div
                                key={artist.id}
                                className="p-3 rounded-lg cursor-pointer hover:bg-[#1E1E1E] flex flex-col items-center gap-2"
                            >
                                <img
                                    alt={artist.name}
                                    className="object-cover rounded-full max-w-[160px] max-h-[160px]"
                                    height={160}
                                    src={artist.images[0]?.url}
                                    style={{
                                        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.5)",
                                    }}
                                    width={160}
                                />
                                <span className="max-w-[160px] flex text-left w-full">{artist.name}</span>
                            </div>
                        ))
                    ) : (
                        <span>No se encontraron artistas</span>
                    )}
                </div>
            </div>
            <div />
        </div>
    );
}
