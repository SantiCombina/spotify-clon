import {useNavigate} from "react-router-dom";

import {Button} from "../ui/button";

export function Footer() {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("spotify_token");
        navigate("/login");
    };

    return (
        <div className="w-full h-[72px] flex justify-center items-center">
            <Button variant={"destructive"} onClick={logout}>
                Salir
            </Button>
        </div>
    );
}
