class SteamAppStore {
    type: string;
    name = '';
    steam_appid: number;
    is_free: boolean;
    header_image: string;
    price_overview: {
        currency: string;
        final: number;
    };
    detailed_description: string;
    short_description: string;
    metacritic: {
        score: number;
    };
    genres: Array<Genres>;
}

interface SteamAppStoreInterface {
    success: boolean;
    data: SteamAppStore;
}

interface SteamAppList {
    applist: {
        apps: Array<SteamApp>;
    };
}

interface SteamApp {
    appid: number;
    name: string;
    thumbnail: string;
    thumbnail2: string;
}

interface Genres {
    id: number;
    description: string;
}
