import { useState, type SubmitEvent } from "react";
import { useNavigate, useParams } from "react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import styled from "styled-components";
import { getPostDetail, updatePost } from "../apis/post";
import { postKeys } from "../apis/queryKeys";
import { StatusMessage } from "../components/StatusMessage";
import {
  ButtonRow,
  Counter,
  ErrorText,
  Field,
  FieldFooter,
  FieldLabel,
  PrimaryButton,
  SecondaryButton,
  TextArea,
  TextInput,
} from "../components/form";
import type { Post } from "../types/api";
import { getErrorMessage } from "../utils/error";

const TITLE_MAX = 50;
const CONTENT_MAX = 1000;

export default function PostEditPage() {
  const { postId: postIdParam } = useParams();
  const postId = Number(postIdParam);
  const isValidId = Number.isInteger(postId) && postId > 0;

  const { data, isPending, isError, error } = useQuery({
    queryKey: postKeys.detail(postId),
    queryFn: () => getPostDetail(postId),
    enabled: isValidId,
  });

  if (!isValidId) return <StatusMessage>잘못된 게시글 주소에요.</StatusMessage>;
  if (isPending) return <StatusMessage>게시글을 불러오는 중...</StatusMessage>;
  if (isError) return <StatusMessage>게시글을 불러오지 못했어요. ({error.message})</StatusMessage>
  
  return <EditForm key={data.id} post={data} />;
}

function EditForm({ post }: { post: Post }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);

  const { mutate, isPending } = useMutation({
    mutationFn:updatePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postKeys.all });
      alert("수정되었어요.");
      navigate(`/posts/${post.id}`, { replace: true });
    },
    onError: (error) => alert(getErrorMessage(error, "수정에 실패했어요.")),
  });

const isTitleOver = title.length > TITLE_MAX;
const isContentOver = content.length > CONTENT_MAX;
const isEmpty = title.trim() === "" || content.trim() === "";
const isUnchanged = title === post.title && content === post.content;
const canSubmit = !isEmpty && !isTitleOver && !isContentOver && !isUnchanged && !isPending;

 const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSubmit) return;
    mutate({ postId: post.id, body: { title: title.trim(), content: content.trim() } });
  };

  return (
    <section>
      <Heading>게시글 수정</Heading>
      <Form onSubmit={handleSubmit}>
        <Field>
          <FieldLabel htmlFor="edit-title">제목</FieldLabel>
          <TextInput
            id="edit-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            $invalid={isTitleOver}
            aria-invalid={isTitleOver}
          />
          <FieldFooter>
            {isTitleOver && <ErrorText role="alert">제목은 {TITLE_MAX}자를 넘을 수 없어요.</ErrorText>}
            <Counter $over={isTitleOver}>
              {title.length} / {TITLE_MAX}
            </Counter>
          </FieldFooter>
        </Field>

        <Field>
          <FieldLabel htmlFor="edit-content">본문</FieldLabel>
          <TextArea
            id="edit-content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            $invalid={isContentOver}
            aria-invalid={isContentOver}
          />
          <FieldFooter>
            {isContentOver && (
              <ErrorText role="alert">본문은 {CONTENT_MAX}자를 넘을 수 없어요.</ErrorText>
            )}
            <Counter $over={isContentOver}>
              {content.length} / {CONTENT_MAX}
            </Counter>
          </FieldFooter>
        </Field>

        <ButtonRow>
          <SecondaryButton type="button" onClick={() => navigate(`/posts/${post.id}`)}>
            취소
          </SecondaryButton>
          <PrimaryButton type="submit" disabled={!canSubmit}>
            {isPending ? "수정 중..." : "수정"}
          </PrimaryButton>
        </ButtonRow>
      </Form>
    </section>
  );
}

const Heading = styled.h1`
  margin-bottom: 24px;
  font-size: 26px;
  font-weight: 800;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;
