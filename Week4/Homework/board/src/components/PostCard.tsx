import { Link } from "react-router";
import styled from "styled-components";
import type { Post } from "../types/api";
import { formatDateTime } from "../utils/date";

interface PostCardProps {
    post: Post;
}

export default function PostCard({ post }: PostCardProps) {
    return (
        <li>
            <CardLink to={`/posts/${post.id}`}>
             <article>
                <Title>{post.title}</Title>
                 <Content>{post.content}</Content>
                 <Meta>
                    <Author>{post.author}</Author>
                    <time dateTime={post.createdAt}>{formatDateTime(post.createdAt)}</time>
                 </Meta>
            </article>
           </CardLink>
        </li>
    );
}

const CardLink = styled(Link)`
    display: block;
    padding: 20px 24px;
    border-radius: ${({ theme }) => theme.radius.lg};
    background: ${({ theme }) => theme.color.surface};
    border: 1px solid ${({ theme }) => theme.color.border};
    transition: background-color ${({ theme }) => theme.transition};
    
    &: hover {
    background: ${({ theme }) => theme.color.surfaceHover};
    }

    &: focus-visible {
        outline: 2px solid ${({ theme }) => theme.color.primary};
        outline: offset: 2px;
    }
`;

const Title = styled.h2`
    font-size: 18px;
    font-weight: 700,
`;

const Content = styled.p`
    margin-top: 8px;
    color: ${({ theme }) => theme.color.textSub};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const Meta = styled.p`
    display: flex;
    gap: 8px;
    margin-top: 12px;
    font-size: 13px;
    color: ${({ theme }) => theme.color.textSub};
`;

const Author = styled.span`
    color: ${({ theme }) => theme.color.primary};
    font-weight: 600;
`;