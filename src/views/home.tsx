import {useEffect, useState} from "react";

import apiController from "@/controllers/api-controller";

export function Home() {
    const [token, setToken] = useState<string | null>(null);
    const [artist, setArtist] = useState<any>(null);

    const fetchToken = async () => {
        const accessToken = await apiController.getToken();

        setToken(accessToken);
    };

    const fetchArtist = async (artistId: string) => {
        const artistData = await apiController.getArtist(artistId);

        setArtist(artistData);
    };

    useEffect(() => {
        fetchToken();
        fetchArtist("0TnOYISbd1XYRBk9myaseg");
    }, []);

    return (
        <div className="flex flex-col gap-4">
            <span>Hola Mundo !</span>

            <span>{token ? `El token es: ${token}` : "Cargando token..."}</span>

            {artist ? (
                <div>
                    <h2>{artist.name}</h2>
                    <img alt={artist.name} src={artist.images[0]?.url} width={200} />
                </div>
            ) : (
                <span>Cargando artista...</span>
            )}
        </div>
    );
}
