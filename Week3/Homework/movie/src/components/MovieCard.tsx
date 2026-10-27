import styled from '@emotion/styled'
import { memo, useState } from 'react';
import { Link } from 'react-router';
import type { MovieListItem } from '../types/movie';
import { getImageUrl } from '../utils/image';

interface MovieCardProps {
    movie: MovieListItem;
}

const formatReleaseDate = (date: string): string => {
    if (!date) return "개봉일 미정";
    const parsed = new Date(date);
    if (Number.isNaN(parsed.getTime())) return date;
    return parsed.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });
};

const MovieCard = memo(({ movie }: MovieCardProps) => {
    const [hasImageError, setHasImageError] = useState(false);
    const posterUrl = getImageUrl(movie.poster_path, 'w342');

    return (
        <Card to={`/movie/${movie.id}`}>
            <PosterBox>
                {posterUrl && !hasImageError ? (
                    <Poster
                        src={posterUrl}
                        alt={`${movie.title} 포스터`}
                        loading="lazy"
                        onError={() => setHasImageError(true)}
                    />
                ) : (
                    <NoPoster>No Image</NoPoster>
                )}

                <RatingBadge>★ {movie.vote_average.toFixed(1)}</RatingBadge>
            </PosterBox>

            <Info>
                <Title>{movie.title}</Title>
                <ReleaseDate>{formatReleaseDate(movie.release_date)}</ReleaseDate>
                <Overview>{movie.overview || '줄거리 정보가 없어요.'}</Overview>
            </Info>
        </Card>
    );
});

MovieCard.displayName = 'MovieCard';

export default MovieCard;

const Card = styled(Link)`
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: hidden;
    border-radius: ${({ theme }) => theme.radius.md};
    background-color: ${({ theme }) => theme.colors.surface};
    box-shadow: ${({ theme }) => theme.shadow.card};
    border: 1px solid ${({ theme }) => theme.colors.border};

    transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;

    &:hover {
    transform: translateY(-6px);
    box-shadow: ${({ theme }) => theme.shadow.cardHover};
    border-color: ${({ theme }) => theme.colors.primary};

    @media (prefers-reduced-motion: reduce) {
    &,
    img {
        transition: none;
    }
    &:hover,
    &:hover img {
      transition: none;
      }
    }
`;

const PosterBox = styled.div`
    position: relative;
    aspect-ratio: 2 / 3;
    background-color: ${({ theme }) => theme.colors.surfaceHover};
    overflow: hidden; 
    `;

const Poster = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.35s ease;
`;

const NoPoster = styled.div`
    display: flex,
    align-items: center,
    justify-content: center,
    width: 100%,
    height: 100%,
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 14px,
    font-weight: 600,
`;

const RatingBadge = styled.span`
    position: absolute;
    top: 12px;
    left: 12px;
    padding: 2px 8px;
    border-radius: ${({ theme }) => theme.radius.sm};
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primaryText};
    font-size: 13px;
    font-weight: 700;
`;

const Info = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 16px;
`;

const Title = styled.h3`
    font-size: 16px;
    font-weight: 700;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const ReleaseDate = styled.p`
    font-size: 13px;
    color: ${({ theme }) => theme.colors.primary};
`;

const Overview = styled.p`
    margin-top: 4px;
    font-size: 13px;
    line-height: 1.6;
    color: ${({ theme }) => theme.colors.textSub};
    display: -webkit-box; /* 줄거리는 3줄까지만 보여주고 나머지는 ...(카드 높이 통일) */
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden; 
`;