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
        <div className="min-h-[100dvh] bg-[#000000] text-[#FFFFFF] flex flex-col justify-center items-center custom-scrollbar">
            <Button onClick={fetchToken}>Conectar a Spotify</Button>
        </div>
    );
}
