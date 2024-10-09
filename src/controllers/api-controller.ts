import {CLIENT_ID, CLIENT_SECRET} from "@/config/config";

let token: string | null = null;

const getToken = async (): Promise<string | null> => {
    if (token) return token;

    const params = new URLSearchParams();

    params.append("grant_type", "client_credentials");

    try {
        const response = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: {
                Authorization: "Basic " + btoa(`${CLIENT_ID}:${CLIENT_SECRET}`),
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: params.toString(),
        });

        const data = await response.json();

        token = data.access_token;

        return token;
    } catch (error) {
        alert("Error obteniendo el token");

        return null;
    }
};

const getArtist = async (artistId: string) => {
    try {
        const accessToken = await getToken();

        if (!accessToken) {
            alert("No se pudo obtener el token");

            return null;
        }

        const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        const data = await response.json();

        return data;
    } catch (error) {
        alert("Error obteniendo el artista");

        return null;
    }
};

export default {getToken, getArtist};
