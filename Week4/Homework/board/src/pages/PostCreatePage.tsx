import { useState, type SubmitEvent } from "react";
import { useNavigate } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import styled from "styled-components";
import { createPost } from "../apis/post";
import { postKeys } from "../apis/queryKeys";
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
import type { CreatePostRequest } from "../types/api";
import { getErrorMessage } from "../utils/error";

type Step = keyof CreatePostRequest;
const STEPS: Step[] = ["title", "content", "author"];

const STEP_CONFIG: Record<
  Step,
  { label: string; placeholder: string; maxLength: number; overMessage: string }
> = {
  title: {
    label: "제목",
    placeholder: "제목을 입력하세요",
    maxLength: 50,
    overMessage: "제목은 50자를 넘을 수 없어요.",
  },
  content: {
    label: "본문",
    placeholder: "본문을 입력하세요",
    maxLength: 1000,
    overMessage: "본문은 1000자를 넘을 수 없어요."
  },
  author: {
    label: "작성자",
    placeholder: "작성자 이름을 입력하세요",
    maxLength: 20,
    overMessage: "작성자는 20자를 넘을 수 없어요."
  },
};

export default function PostCreatePage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [step, setStep] = useState<Step>("title");
  const [form, setForm] = useState<CreatePostRequest>({ title: "", content: "", author: "" });
  const { mutate, isPending } = useMutation({
    mutationFn: createPost,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: postKeys.lists() });
      alert(`${variables.author}님, 게시글이 작성되었어요!`);
      navigate("/posts");
    },
    onError: (error) => alert(getErrorMessage(error, "게시글 작성에 실패했어요.")),
  });

  const stepIndex = STEPS.indexOf(step);
  const isLastStep = stepIndex === STEPS.length - 1;
  const config = STEP_CONFIG[step];
  const value = form[step];

  const isEmpty = value.trim() === "";
  const isOver = value.length > config.maxLength;
  const canProceed = !isEmpty && !isOver && !isPending;

  const handleChange = (next: string) => {
    setForm((prev) => ({ ...prev, [step]: next }));
};

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if  (!canProceed) return;

    if (!isLastStep) {
      setStep(STEPS[stepIndex + 1]);
      return;
    }
    mutate({
      title: form.title.trim(),
      content: form.content.trim(),
      author: form.author.trim(),
    });
  };

  return (
    <section>
      <Heading>
        <h1>게시글 작성</h1>
        <StepIndicator aria-label={`${STEPS.length}단계 중 ${stepIndex + 1}단계`}>
          {stepIndex + 1} / {STEPS.length}
        </StepIndicator>
      </Heading>

      <Form onSubmit={handleSubmit}>
        <Field>
          <FieldLabel htmlFor={`post-${step}`}>{config.label}</FieldLabel>
          {step === "content" ? (
            <TextArea
              key={step}
              id={`post-${step}`}
              value={value}
              onChange={(e) => handleChange(e.target.value)}
              placeholder={config.placeholder}
              $invalid={isOver}
              aria-invalid={isOver}
              autoFocus
            />
          ) : (
            <TextInput
              key={step}
              id={`post-${step}`}
              value={value}
              onChange={(e) => handleChange(e.target.value)}
              placeholder={config.placeholder}
              $invalid={isOver}
              aria-invalid={isOver}
              autoFocus
            />
          )}
          <FieldFooter>
            {isOver && <ErrorText role="alert">{config.overMessage}</ErrorText>}
            <Counter $over={isOver}>
              {value.length} / {config.maxLength}
            </Counter>
          </FieldFooter>
        </Field>

        <ButtonRow>
          <SecondaryButton type="button" onClick={() => navigate("/posts")}>
            목록으로
          </SecondaryButton>
          {stepIndex > 0 && (
            <SecondaryButton type="button" onClick={() => setStep(STEPS[stepIndex - 1])}>
              이전
            </SecondaryButton>
          )}
          <PrimaryButton type="submit" disabled={!canProceed}>
            {isLastStep ? (isPending ? "작성 중..." : "작성") : "다음"}
          </PrimaryButton>
        </ButtonRow>
      </Form>
    </section>
  );
}

const Heading = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 24px;
  
  h1 {
    font-size: 26px;
    font-weight: 800;
  }
`;

const StepIndicator = styled.span`
  color: ${({ theme }) => theme.color.primary};
  font-weight: 700;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;


