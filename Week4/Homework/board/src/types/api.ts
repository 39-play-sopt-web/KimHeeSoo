export interface ApiResponse<T> {
    isSuccess: boolean;
    code: string;
    message: string;
    data: T;
}

export type Part = "WEB" | "IOS" | "ANDROID";

export interface IssueCodeRequest {
    part: Part;
}

export interface IssueCodeResponse {
    authorizationCode: string;
}

export interface Post {
    id: number;
    title: string;
    content: string;
    author: string;
    createdAt: string;
    updatedAt: string;
}

export interface GetPostsParams {
    keyword?: string;
    cursor?: number;
    size?: number;
}

export interface PostListResponse {
    posts: Post[];
    nextCursor: number | null;
    hasNext: boolean;
}

export interface CreatePostRequest {
    title: string;
    content: string;
    author: string;
}

export interface UpdatePostRequest {
    title: string;
    content: string;
}