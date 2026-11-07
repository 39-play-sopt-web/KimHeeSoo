export const postKeys = {
    all: ["posts"] as const,
    lists: () => [...postKeys.all, "list"] as const,
    list: (keyword: string) => [...postKeys.lists(), keyword] as const,
    details: () => [...postKeys.all, "detail"] as const,
    detail: (postId: number) => [...postKeys.details(), postId] as const,
};

