import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { getMovies } from '../apis/movie';
import MovieCard from '../components/MovieCard';
import type { MovieListItem } from '../types/movie';

const MovieListPage = () => {
    const [movies, setMovies] = useState<MovieListItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        let isActive = true;

        const fetchMovies = async () => {
            try {
                const data = await getMovies(1, 0, 10);
                if (!isActive) return;
                setMovies(data.results);
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
    }, []);

    if (isLoading) {
        return <Message>영화를 불러오는 중이에요...</Message>;
    }

    if (errorMessage) {
        return <Message role='alert'>{errorMessage}</Message>;
    }

    return (
        <Page>
            <Heading>영화 둘러보기</Heading>
            {movies.length === 0 ? (
                <Message>조건에 맞는 영화가 없어요.</Message>
            ) : (
                <Grid>
                    {movies.map((movie) => (
                        <li key={movie.id}>
                            <MovieCard movie={movie} />
                        </li>
                    ))}
                </Grid>
            )}
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
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 12px;
    }
`;

const Message = styled.p`
    padding: 80px 16px;
    text-align: center;
    color: ${({ theme }) => theme.colors.textSub};
`;
