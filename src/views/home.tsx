import {useEffect} from "react";

import {useGetToken} from "@/hooks/use-get-token";

export function Home() {
    const {token} = useGetToken();

    const getArtists = async () => {
        if (!token) return;
        console.log("token", token);
    };

    useEffect(() => {
        getArtists();
    }, [token]);

    return (
        <div className="flex flex-col gap-4">
            <span>Home</span>
        </div>
    );
}
