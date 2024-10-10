import { createContext, useContext, useState, ReactNode } from 'react';

type Artist = {
    id: string;
    name: string;
    images: { url: string }[];
};

type Song = {
    id: string;
    name: string;
    artist: string;
    albumId: string;
    albumName:string;
};

type FavoritesContextType = {
    favoriteArtists: Artist[];
    favoriteSongs: Song[];  // Agrega esta línea
    toggleFavorite: (artist: Artist) => void;
    toggleFavoriteSong: (song: Song) => void; // Asegúrate de que esto esté aquí
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
    const [favoriteArtists, setFavoriteArtists] = useState<Artist[]>([]);
    const [favoriteSongs, setFavoriteSongs] = useState<Song[]>([]); // Asegúrate de tener este estado

    const toggleFavorite = (artist: Artist) => {
        setFavoriteArtists((prevFavorites) => {
            const isFavorite = prevFavorites.find(fav => fav.id === artist.id);
            if (isFavorite) {
                return prevFavorites.filter(fav => fav.id !== artist.id);
            } else {
                return [...prevFavorites, artist];
            }
        });
    };

    const toggleFavoriteSong = (song: Song) => {
        setFavoriteSongs((prevFavorites) => {
            const isFavorite = prevFavorites.find(fav => fav.id === song.id);
            if (isFavorite) {
                return prevFavorites.filter(fav => fav.id !== song.id);
            } else {
                return [...prevFavorites, song];
            }
        });
    };

    return (
        <FavoritesContext.Provider value={{ favoriteArtists, favoriteSongs, toggleFavorite, toggleFavoriteSong }}>
            {children}
        </FavoritesContext.Provider>
    );
};

export const useFavorites = () => {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error("useFavorites must be used within a FavoritesProvider");
    }
    return context;
};
