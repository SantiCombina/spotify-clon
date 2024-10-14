import {createContext, useContext, useState, useEffect, ReactNode} from "react";

type Artist = {
    id: string;
    name: string;
    images: {url: string}[];
};

type Song = {
    id: string;
    name: string;
    artist: string;
    albumId: string;
    albumName: string;
};

type FavoritesContextType = {
    favoriteArtists: Artist[];
    favoriteSongs: Song[];
    toggleFavorite: (artist: Artist) => void;
    toggleFavoriteSong: (song: Song) => void;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

const loadFromLocalStorage = <T,>(key: string, initialValue: T): T => {
    if (typeof window !== "undefined") {
        const storedValue = localStorage.getItem(key);

        return storedValue ? JSON.parse(storedValue) : initialValue;
    }

    return initialValue;
};

const saveToLocalStorage = (key: string, value: any) => {
    if (typeof window !== "undefined") {
        localStorage.setItem(key, JSON.stringify(value));
    }
};

export function FavoritesProvider({children}: {children: ReactNode}) {
    const [favoriteArtists, setFavoriteArtists] = useState<Artist[]>(() =>
        loadFromLocalStorage<Artist[]>("favoriteArtists", []),
    );
    const [favoriteSongs, setFavoriteSongs] = useState<Song[]>(() => loadFromLocalStorage<Song[]>("favoriteSongs", []));

    useEffect(() => {
        saveToLocalStorage("favoriteArtists", favoriteArtists);
    }, [favoriteArtists]);

    useEffect(() => {
        saveToLocalStorage("favoriteSongs", favoriteSongs);
    }, [favoriteSongs]);

    const toggleFavorite = (artist: Artist) => {
        setFavoriteArtists((prevFavorites) => {
            const isFavorite = prevFavorites.find((fav) => fav.id === artist.id);

            if (isFavorite) {
                return prevFavorites.filter((fav) => fav.id !== artist.id);
            } else {
                return [...prevFavorites, artist];
            }
        });
    };

    const toggleFavoriteSong = (song: Song) => {
        setFavoriteSongs((prevFavorites) => {
            const isFavorite = prevFavorites.find((fav) => fav.id === song.id);

            if (isFavorite) {
                return prevFavorites.filter((fav) => fav.id !== song.id);
            } else {
                return [...prevFavorites, song];
            }
        });
    };

    return (
        <FavoritesContext.Provider value={{favoriteArtists, favoriteSongs, toggleFavorite, toggleFavoriteSong}}>
            {children}
        </FavoritesContext.Provider>
    );
}

export const useFavorites = () => {
    const context = useContext(FavoritesContext);

    if (!context) {
        throw new Error("Deberías usar este hook dentro de un FavoritesProvider");
    }

    return context;
};
