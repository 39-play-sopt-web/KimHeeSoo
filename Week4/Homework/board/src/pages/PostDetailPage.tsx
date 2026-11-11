import { Link, useNavigate, useParams } from "react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import styled from "styled-components";
import { deletePost, getPostDetail } from "../apis/post";
import { postKeys } from "../apis/queryKeys";
import { StatusMessage } from "../components/StatusMessage";
import { PrimaryButton, SecondaryButton } from "../components/form";
import { isLoggedInAtom } from "../stores/auth";
import { formatDateTime } from "../utils/date";
import { getErrorMessage } from "../utils/error";

export default function PostDetailPage() {
  const { postId: postIdParam } = useParams();
  const postId = Number(postIdParam);
  const isValidId = Number.isInteger(postId) && postId > 0;

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const isLoggedIn = useAtomValue(isLoggedInAtom);

  const { data, isPending, isError, error } = useQuery({
    queryKey: postKeys.detail(postId),
    queryFn: () => getPostDetail(postId),
    enabled: isValidId,
  });

  const { mutate: removePost, isPending: isDeleting } = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      alert("삭제되었어요.");
      navigate("/posts", { replace: true });
      queryClient.invalidateQueries({ queryKey: postKeys.lists() });
      queryClient.invalidateQueries({ queryKey: postKeys.detail(postId), refetchType: "none" });
    },
    onError: (err) => alert(getErrorMessage(err, "삭제에 실패했어요.")),
  });

  const handleDelete = () => {
    if (!isLoggedIn) {
      alert("인증 코드가 필요해요. 코드를 먼저 발급받아 주세요.");
      navigate("/");
      return;
    }
    if (!confirm("정말 삭제할까요?")) return;
    removePost(postId);
  };

  if (!isValidId) return <StatusMessage>잘못된 게시글 주소예요.</StatusMessage>
  if (isPending) return <StatusMessage>게시글을 불러오는 중...</StatusMessage>
  if (isError) return <StatusMessage>게시글을 불러오지 못했어요. ({error.message})</StatusMessage>

  return (
    <>
      <BackLink to="/posts">← 목록으로</BackLink>
      <Article>
        <header>
          <Title>{data.title}</Title>
          <Meta>
            <Author>{data.author}</Author>
            <time dateTime={data.createdAt}>{formatDateTime(data.createdAt)}</time>
          </Meta>
        </header>
        <Content>{data.content}</Content>
        <Actions>
          <SecondaryButton type="button" onClick={() => navigate(`/posts/${postId}/edit`)}>
            수정
          </SecondaryButton>
          <PrimaryButton type="button" onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? "삭제 중..." : "삭제"}
          </PrimaryButton>
        </Actions>
      </Article>
    </>
  );
}

const BackLink = styled(Link)`
  display: inline-block;
  margin-bottom: 16px;
  padding: 8px 14px;
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.radius.md};
  font-size: 14px;
  transition: background-color ${({ theme }) => theme.transition};

  &:hover {
    background: ${({ theme }) => theme.color.surfaceHover};
  }
`;

const Article = styled.article`
  padding: 28px;
   border-radius: ${({ theme }) => theme.radius.lg};
   background: ${({ theme }) => theme.color.surface};
   border: 1px solid ${({ theme }) => theme.color.border};
`;

const Title = styled.h1`
  font-size: 26px;
  font-weight: 800;
  word-break: break-all;
`;

const Meta = styled.p`
  display: flex;
  gap: 8px;
  margin-top: 8px;
  font-size: 13px;
  color: ${({ theme }) => theme.color.textSub};
`;

const Author = styled.span`
  color: ${({ theme }) => theme.color.primary};
  font-weight: 600;
`;

const Content = styled.p`
  margin-top: 24px;
  padding-bottom: 24px;
  border-bottom: 1px solid ${({ theme }) => theme.color.border};
  line-height: 1.7;
  white-space: pre-wrap;
  word-break: break-all;
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 20px;
`;