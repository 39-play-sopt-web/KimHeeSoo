import { isAxiosError } from "axios";
import type { ApiResponse } from "../types/api";

export const getErrorMessage = (error: unknown, fallback: string) => {
    if (isAxiosError<ApiResponse<null>>(error)) {
        return error.response?.data?.message ?? fallback;
    }
    return fallback;
};