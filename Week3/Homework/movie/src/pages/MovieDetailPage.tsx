import styled from '@emotion/styled';
import { isAxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router';
import { getMovieDetail } from '../apis/movie';
import type { MovieDetail } from '../types/movie';

import {
    formatCount,
    formatLanguage,
    formatMoney,
    formatRating,
    formatReleaseDate,
    formatRuntime,
    joinOrEmpty,
} from '../utils/format';
import { getImageUrl } from '../utils/image';

const MovieDetailPage = () => {
    const { movieId } = useParams();

    const id = Number(movieId);
    const isValidId = Number.isInteger(id) && id > 0;

    const [movie, setMovie] = useState<MovieDetail | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        if (!isValidId) {
            setErrorMessage('잘못된 영화 주소에요.');
            setIsLoading(false);
            return;
        }

        let isActive = true;
        setIsLoading(true);
        setErrorMessage(null);

        const fetchMovie = async () => {
            try {
                const data = await getMovieDetail(id);
                if (!isActive) return;
                setMovie(data);
            } catch (error) {
                if (!isActive) return;
                const isNotFound = isAxiosError(error) && error.response?.status === 404;
                setErrorMessage(isNotFound ? '영화를 찾을 수 없어요.' : '영화 정보를 불러오지 못했어요.');
            } finally {
                if (isActive) setIsLoading(false);
            }
        };

        fetchMovie();

        return () => {
            isActive = false;
        };
    }, [id, isValidId]);

    const backLink = <BackLink to="/">← 목록으로 돌아가기</BackLink>;

    if (isLoading) {
        return (
            <Page>
                {backLink}
                <Message>영화 정보를 불러오는 중이에요...</Message>
            </Page>
        );
    }

    if (errorMessage || !movie) {
        return (
            <Page>
                {backLink}
                <Message role="alert">{errorMessage ?? '영화 정보가 없어요.'}</Message>
            </Page>
        );
    }

    const basicInfo = [
        { label: '원제', value: movie.original_title },
        { label: '원어', value: formatLanguage(movie.original_language) },
        { label: '제작 국가', value: joinOrEmpty(movie.production_countries.map((country) => country.name)) },
        { label: '사용 언어', value: joinOrEmpty(movie.spoken_languages.map((language) => formatLanguage(language.iso_639_1))) },
        { label: '예산', value: formatMoney(movie.budget) },
        { label: '수익', value: formatMoney(movie.revenue) }
    ];

    const posterUrl = getImageUrl(movie.poster_path, 'w500');

    return (
        <Page>
            {backLink}

            <Hero backdropUrl={getImageUrl(movie.backdrop_path, 'w1280')}>
                <PosterBox>
                    {posterUrl ? <Poster src={posterUrl} alt={`${movie.title} 포스터`} /> : <NoPoster>No Image</NoPoster>}
                </PosterBox>

                <Summary>
                    <Title>{movie.title}</Title>

                    <Meta>
                        <RatingBadge>★ {formatRating(movie.vote_average)}</RatingBadge>
                        <span>{formatReleaseDate(movie.release_date)}</span>
                        <span>{formatRuntime(movie.runtime)}</span>
                        <span> 투표 {formatCount(movie.vote_count)}명</span>
                        <StatusChip>{movie.status}</StatusChip>
                    </Meta>

                    {movie.genres.length > 0 && (
                        <Genres>
                            {movie.genres.map((genre) => (
                                <GenreChip key={genre.id}>{genre.name}</GenreChip>
                            ))}
                        </Genres>
                    )}
                </Summary>
            </Hero>

            <Section>
                <SectionTitle>줄거리</SectionTitle>
                <Overview>{movie.overview || '줄거리 정보가 없어요.'}</Overview>
            </Section>

            <Section>
                <SectionTitle>기본 정보</SectionTitle>
                <InfoGrid>
                    {basicInfo.map(({ label, value }) => (
                        <InfoItem key={label}>
                            <dt>{label}</dt>
                            <dd>{value}</dd>
                        </InfoItem>
                    ))}
                </InfoGrid>
            </Section>
        </Page>
    );
};

export default MovieDetailPage;

const Page = styled.main`
    max-width: 1100px;
    margin: 0 auto;
    padding: 40px 24px 80px;
    
    ${({ theme }) => theme.media.mobile} {
     padding: 24px 16px 64px;
     }
`;

const BackLink = styled(Link)`
    display: inline-block;
    margin-bottom: 24px;
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 600;

    &:hover {
    text-decoration: underline;
    }
`;

const Hero = styled.section<{ backdropUrl: string | null }>`
    display: grid;
    grid-template-columns: 240px 1fr;
    gap: 32px;
    padding: 40px;
    border-radius: ${({ theme }) => theme.radius.md};
    background-color: ${({ theme }) => theme.colors.surface};
    background-image: ${({ backdropUrl }) =>
        backdropUrl ? `linear-gradient(rgba(20, 22, 27, 0.85), rgba(20, 22, 27, 0.85)), url(${backdropUrl})` : 'none'};
    background-size: cover;
    background-position: center;
    
    ${({ theme }) => theme.media.mobile} {
    grid-template-columns: 1fr;
    padding:24px;
    }
`;

const PosterBox = styled.div`
    overflow: hidden;
    aspect-ratio: 2 / 3;
    border-radius: ${({ theme }) => theme.radius.md};
    background-color: ${({ theme }) => theme.colors.surfaceHover};
    box-shadow: ${({ theme }) => theme.shadow.cardHover};
    
    ${({ theme }) => theme.media.mobile} {
    max-width: 200px;
    }
`;

const Poster = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const NoPoster = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    color: ${({ theme }) => theme.colors.textMuted};
`;

const Summary = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

const Title = styled.h1`
    font-size: 32px;
    font-weight: 800;
    line-height: 1.3;
    
    ${({ theme }) => theme.media.mobile} {
    font-size: 24px;
    }
`;

const Meta = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 12px;
    color: ${({ theme }) => theme.colors.textSub};
    font-size: 14px;
`;

const RatingBadge = styled.span`
    padding: 4px 10px;
    border-radius: ${({ theme }) => theme.radius.sm};
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primaryText};
    font-weight: 700;
`;

const StatusChip = styled.span`
    padding: 4px 10px;
    border: 1px solid ${({ theme }) => theme.colors.textMuted};
    border-radius: ${({ theme }) => theme.radius.sm};
    color: ${({ theme }) => theme.colors.text};
`;

const Genres = styled.ul`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
`;

const GenreChip = styled.li`
    padding: 4px 12px;
    border-radius: ${({ theme }) => theme.radius.full};
    background-color: ${({ theme }) => theme.colors.primarySoft};
    color: ${({ theme }) => theme.colors.primary};
    font-size: 13px;
`;

const Section = styled.section`
    margin-top: 48px;
`;

const SectionTitle = styled.h2`
    margin-bottom: 16px;
    font-size: 22px;
    font-weight: 700;
`;

const Overview = styled.p`
    color: ${({ theme }) => theme.colors.textSub};
    line-height: 1.8;
`;

const InfoGrid = styled.dl`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 16px;
`;

const InfoItem = styled.div`
    padding: 20px;
    border-radius: ${({ theme }) => theme.radius.md};
    background-color: ${({ theme }) => theme.colors.surface};
    
    dt {
        margin-bottom: 6px;
        font-size: 13px;
        color: ${({ theme }) => theme.colors.textMuted};
    }
    
    dd {
        font-weight: 600;
        word-break: keep-all;
    }
`;

const Message = styled.p`
    padding: 80px 16px;
    text-align: center;
    color: ${({ theme }) => theme.colors.textSub};
`;
