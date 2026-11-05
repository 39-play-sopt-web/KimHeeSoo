import { instance } from "./instance";
import type { ApiResponse, IssueCodeRequest, IssueCodeResponse} from "../types/api"

export const issueAuthorizationCode = async (
    body: IssueCodeRequest,
): Promise<IssueCodeResponse> => {
    const { data } = await instance.post<ApiResponse<IssueCodeResponse>>(
        "/memebers/authorization-code",
        body,
    );
    return data.data;
};

