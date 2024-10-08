import {useEffect, useState} from "react";

import {CLIENT_ID, CLIENT_SECRET} from "@/config/config";

export function useGetToken() {
    const [token, setToken] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const requestToken = () => {
        setLoading(true);
        const params = new URLSearchParams();

        params.append("grant_type", "client_credentials");
        try {
            fetch("https://accounts.spotify.com/api/token", {
                method: "POST",
                headers: {
                    Authorization: "Basic " + btoa(`${CLIENT_ID}:${CLIENT_SECRET}`),
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: params.toString(),
            })
                .then((res) => res.json())
                .then((data) => {
                    setToken(data.access_token);
                    setError(null);
                });
        } catch (error) {
            console.error("Error obteniendo el token", error);
            setError("Error obteniendo el token");

            setToken(null);
        }
        setLoading(false);
    };

    useEffect(() => {
        requestToken();
    }, []);

    return {token, error, loading};
}
