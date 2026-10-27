const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

type ImageSize = 'w342' | 'w500' | 'w1280' | 'original';

export const getImageUrl = (path: string | null, size: ImageSize = 'w500'): string | null => {
 
    if(!path) return null;
    return `${IMAGE_BASE_URL}/${size}${path}`;
}