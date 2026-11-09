export interface MovieListItem {
    id: number;
    title: string;
    poster_path: string | null;
    release_date: string;
    overview: string;
    vote_average: number;
}

export interface MovieListResponse {
    page: number;
    results: MovieListItem[];
    total_pages: number;
    total_results: number;
}

export interface Genre {
    id: number;
    name: string;
}

export interface ProductionCountry {
    iso_3166_1: string;
    name: string;
}

export interface SpokenLanguage {
    iso_639_1: string;
    name: string;
    english_name: string;
}

export interface MovieDetail {
    id: number;

    poster_path: string | null;
    backdrop_path: string | null;
    title: string;
    release_date: string;
    genres: Genre[];
    vote_average: number;
    runtime: number | null;
    vote_count: number;
    status: string;
    overview: string;

    original_title: string;
    original_language: string;
    production_countries: ProductionCountry[];
    spoken_languages: SpokenLanguage[];
    budget: number;
    revenue: number;
}