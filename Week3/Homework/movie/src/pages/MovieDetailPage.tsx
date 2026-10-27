import { useParams, Link } from 'react-router';

const MovieDetailPage = () => {
    const { movieId } = useParams();

    return (
        <div style={{ padding: '2rem' }}>
            <Link to="/">← 목록으로</Link>
            <h1>영화 번호: {movieId}</h1>
        </div>
    );
};

export default MovieDetailPage;