import { CLIENT_ID, CLIENT_SECRET } from "@/config/config";

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

const getArtists = async (searchTerm: string) => {
    try {
        const accessToken = await getToken();

        if (!accessToken) {
            alert("No se pudo obtener el token");
            return null;
        }

        const response = await fetch(
            `https://api.spotify.com/v1/search?q=${encodeURIComponent(searchTerm)}&type=artist`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        const data = await response.json();
        return data.artists.items;
    } catch (error) {
        alert("Error buscando los artistas");
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

        if (!response.ok) {
            console.error("Error en la respuesta de la API", response);
            alert("Error obteniendo los datos del artista");
            return null;
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error al obtener el artista", error);
        alert("Error obteniendo el artista");
        return null;
    }
};

const getAlbumsByArtist = async (artistId: string) => {
    try {
        const accessToken = await getToken();

        if (!accessToken) {
            alert("No se pudo obtener el token");
            return null;
        }

        const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}/albums`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        const data = await response.json();
        return data.items;
    } catch (error) {
        alert("Error obteniendo los álbumes");
        return null;
    }
};

// Mueve getAlbumDetails fuera de getAlbumsByArtist
const getAlbumDetails = async (albumId: string) => {
    try {
        const accessToken = await getToken();

        if (!accessToken) {
            alert("No se pudo obtener el token");
            return null;
        }

        const response = await fetch(`https://api.spotify.com/v1/albums/${albumId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (!response.ok) {
            console.error("Error en la respuesta de la API", response);
            alert("Error obteniendo los detalles del álbum");
            return null;
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error al obtener los detalles del álbum", error);
        alert("Error obteniendo los detalles del álbum");
        return null;
    }
};

export default { getToken, getArtists, getArtist, getAlbumsByArtist, getAlbumDetails };
