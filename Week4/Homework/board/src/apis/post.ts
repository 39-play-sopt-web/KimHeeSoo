import { instance } from "./instance";

import type {
    ApiResponse,
    CreatePostRequest,
    GetPostsParams,
    Post,
    PostListResponse,
    UpdatePostRequest,
} from "../types/api";

export const getPosts = async ({
    keyword,
    cursor,
    size,
}: GetPostsParams = {}): Promise<PostListResponse> => {
    const { data } = await instance.get<ApiResponse<PostListResponse>>("/posts", {
        params: { // 공백뿐인 검색어 : undefined 처리 (쿼리스트링에서 제외)
            keyword: keyword?.trim() || undefined,
            cursor,
            size,
        },
    });
    return data.data;
};

export const getPostDetail = async (postId: number): Promise<Post> => {
    const { data } = await instance.get<ApiResponse<Post>>(`/posts/${postId}`);
    return data.data;
};

export const createPost = async (body: CreatePostRequest): Promise<Post> => {
    const { data } = await instance.post<ApiResponse<Post>>("/posts", body);
    return data.data;
}

export const updatePost = async ({
    postId,
    body,
}: {
    postId: number;
    body: UpdatePostRequest;
}): Promise<Post> => {
    const { data } = await instance.put<ApiResponse<Post>>(`./posts/${postId}`, body);
    return data.data;
};

export const deletePost = async (postId: number): Promise<void> => {
    await instance.delete(`/posts/${postId}`);
};