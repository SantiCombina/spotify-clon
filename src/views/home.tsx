import {Link, useNavigate} from "react-router-dom";

import {Button} from "@/components/ui/button";

export function Home() {
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem("spotify_token");
        navigate("/login");
    };

    return (
        <div className="flex flex-col items-center justify-center h-[calc(100vh-6rem)] gap-2">
            <Link to={"/artists"}>Artistas</Link>
            <Button onClick={logout}>Salir</Button>
        </div>
    );
}
