import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';
import { getMovies } from '../apis/movie';
import MovieCard from '../components/MovieCard';
import RatingFilter from '../components/RatingFilter';
import { DEFAULT_RATING_KEY, findRatingOption, type RatingKey } from '../constants/rating';
import type { MovieListItem } from '../types/movie';

const MAX_PAGE = 500;

const MovieListPage = () => {
    const [ratingKey, setRatingKey] = useState<RatingKey>(DEFAULT_RATING_KEY);
    const [movies, setMovies] = useState<MovieListItem[]>([]);
    const [page, setPage] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const sentinelRef = useRef<HTMLDivElement>(null);

    const handleRatingChange = (key: RatingKey) => {
        setRatingKey(key);
        setPage(1);
        setMovies([]);
        setIsLoading(true); 
        setHasNextPage(true);
        window.scrollTo(0, 0);
    };


    useEffect(() => {
        let isActive = true;
        setIsLoading(true);
        setErrorMessage(null);

        const fetchMovies = async () => {
            const { min, max } = findRatingOption(ratingKey);

            try {
                const data = await getMovies(page, min, max);
                if (!isActive) return;

                setMovies((prev) => {
                    if (page === 1) return data.results;

                    const existingIds = new Set(prev.map((movie) => movie.id));
                    const newMovies = data.results.filter((movie) => !existingIds.has(movie.id));
                    return [...prev, ...newMovies];
                });

                setHasNextPage(data.page < Math.min(data.total_pages, MAX_PAGE));
            } catch {
                if (!isActive) return;
                setErrorMessage("영화 목록을 불러오지 못했어요.");
            } finally {
                if (isActive) setIsLoading(false);
            }
        };

        fetchMovies();

        return () => {
            isActive = false;
        };
    }, [ratingKey, page]);

    useEffect(() => {
        const target = sentinelRef.current;

        if (!target || isLoading || !hasNextPage || errorMessage) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setPage((prev) => prev + 1);
                }
            },
            { rootMargin: '300px' },
        );

        observer.observe(target);

        return () => observer.disconnect();
    }, [isLoading, hasNextPage, errorMessage]);

    const isFirstLoad = movies.length === 0;

    return (
        <Page>
            <Heading>영화 둘러보기</Heading>
            <RatingFilter selectedKey={ratingKey} onChange={handleRatingChange} />

            {isFirstLoad && isLoading && <Message>영화를 불러오는 중이에요...</Message>}
            {isFirstLoad && errorMessage && <Message role="alert">{errorMessage}</Message>}
            {isFirstLoad && !isLoading && !errorMessage && <Message>조건에 맞는 영화가 없어요.</Message>}

            {!isFirstLoad && (
                <Grid>
                    {movies.map((movie) => (
                        <li key={movie.id}>
                            <MovieCard movie={movie} />
                        </li>
                    ))}
                </Grid>
            )}

            <div ref={sentinelRef} aria-hidden />

            {!isFirstLoad && isLoading && <Message>다음 영화를 불러오는 중이에요...</Message>}
            {!isFirstLoad && errorMessage && <Message role="alert">{errorMessage}</Message>}
            {!isFirstLoad && !hasNextPage && <Message>마지막 영화까지 모두 봤어요.</Message>}
        </Page>
    );
};

export default MovieListPage;

const Page = styled.main`
            max-width: 1200px;
            margin: 0 auto;
            padding: 48px 24px 80px;

            ${({ theme }) => theme.media.mobile} {
                padding: 24px 16px 64px;
    }
            `;

const Heading = styled.h1`
            margin-bottom: 32px;
            font-size: 28px;
            font-weight: 800;
            `;

const Grid = styled.ul`
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 24px;

            ${({ theme }) => theme.media.mobile} {
                grid - template - columns: repeat(2, minmax(0, 1fr));
            gap: 12px;
    }
            `;

const Message = styled.p`
            padding: 80px 16px;
            text-align: center;
            color: ${({ theme }) => theme.colors.textSub};
            `;
