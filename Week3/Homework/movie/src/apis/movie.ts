import { instance } from './instance'
import type { MovieDetail, MovieListResponse } from '../types/movie';

export const getMovies = async (page: number, minRating: number, maxRating: number) => {
    const { data } = await instance.get<MovieListResponse>('/discover/movie', {
        params: {
            page,
            'vote_average.gte': minRating,
            'vote_average.lte': maxRating,
        },
    });
    return data;
};

export const getMovieDetail = async (movieId: number) => {
    const { data } = await instance.get<MovieDetail>(`/movie/${movieId}`);
    return data;
}

