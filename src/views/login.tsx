import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

import apiController from "@/controllers/api-controller";
import {Button} from "@/components/ui/button";

export function Login() {
    const navigate = useNavigate();

    const fetchToken = async () => {
        const accessToken = await apiController.getToken();

        if (!accessToken) {
            alert("No se pudo obtener el token");

            return;
        }

        localStorage.setItem("spotify_token", accessToken);

        navigate("/");
    };

    useEffect(() => {
        const storedToken = localStorage.getItem("spotify_token");

        if (storedToken) {
            navigate("/");
        }
    }, [navigate]);

    return (
        <div className="h-[100dvh] bg-black text-white flex flex-col justify-center items-center p-2">
            <Button className="text-xl bg-green-500 hover:bg-green-500/90 px-14 py-7" onClick={fetchToken}>
                Conectar a Spotify
            </Button>
        </div>
    );
}
