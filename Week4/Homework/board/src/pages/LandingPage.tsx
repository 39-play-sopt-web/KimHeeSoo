import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { useSetAtom } from "jotai";
import { isAxiosError } from "axios";
import styled from "styled-components";
import { issueAuthorizationCode } from "../apis/member";
import { authAtom } from "../stores/auth";
import type { ApiResponse, Part } from "../types/api";

const PART_OPTIONS: { value: Part; label: string }[] = [
    { value: "WEB", label: "WEB" },
    { value: "IOS", label: "IOS" },
    { value: "ANDROID", label: "ANDROID" },
];

export default function LandingPage() {
    const [part, setPart] = useState<Part | null>(null);
    const setAuth = useSetAtom(authAtom);
    const navigate = useNavigate();

    const { mutate, isPending } = useMutation({
        mutationFn: issueAuthorizationCode,
        onSuccess: ({ authorizationCode }, { part: issuedPart }) => {
            setAuth({ authorizationCode, part: issuedPart });
            navigate("/posts", { replace: true });
        },
        onError: (error) => {
            const serverMessage = isAxiosError<ApiResponse<null>>(error)
                ? error.response?.data?.message
                : undefined;
            alert(serverMessage ?? "코드 발급에 실패했어요. 잠시 후 다시 시도해 주세요.");
        },
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!part || isPending) return;
        mutate({ part });
    };

    return (
        <Page>
            <Title>
                PLAY SOPT <strong>BOARD</strong>
            </Title>
            <Description>파트를 선택하고 인증 코드를 발급받으세요.</Description>

            <Form onSubmit={handleSubmit}>
                <PartFieldset>
                    <legend>파트 선택</legend>
                    {PART_OPTIONS.map(({ value, label }) => (
                        <PartOption key = {value}>
                            <input
                              type="radio"
                              name="part"
                              value={value}
                              checked={part === value}
                              onChange={() => setPart(value)}
                              />
                              <span>{label}</span>
                        </PartOption>
                    ))}
                </PartFieldset>

                <IssueButton type="submit" disabled={!part || isPending}>
                    {isPending ? "발급 중..." : "코드 발급"}
                </IssueButton>
            </Form>

            <ListLink to="/posts">게시판 목록 보기</ListLink>
        </Page>
    );
}

const Page = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
    min-height: 100vh;
    padding: 20px;
`;

const Title = styled.h1`
    font-size: 36px;
    font-weight: 800;
    
    strong {
        color: ${({ theme }) => theme.color.primary};
    }
`;
const Description = styled.p`
     color: ${({ theme }) => theme.color.textSub};
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
    max-width: 400px;
    margin-top: 16px;
`;

const PartFieldset = styled.fieldset`
    display: flex;
    gap: 8px;
    border: none;
    
    legend {
        postion: absolute;
        width: 1px;
        height: 1px;
        overflow: hidden;
        clip-path: inset(50%);
    }
`;

const PartOption = styled.label`
    flex: 1;
    cursor: pointer;
    
    input {
        position: absolute;
        opacity: 0;
    }
        
    span {
        display: block;
        padding: 12px 0;
        border: 1px solid ${({ theme }) => theme.color.border};
        border-radius: ${({ theme }) => theme.radius.md};
        background: ${({ theme }) => theme.color.surface};
        color: ${({ theme }) => theme.color.textSub};
        text-align: center;
        font-weight: 600;
        transition: 
            border-color ${({ theme }) => theme.transition},
            color ${({ theme }) => theme.transition};
    }

    input:checked + span {
        border-color: ${({ theme }) => theme.color.primary};
        color: ${({ theme }) => theme.color.primary};

    }

    inputLfocus-visible + span {
        outline: 2px solid ${({ theme }) => theme.color.primary};
        outline-offset: 2px;
    }
`;

const IssueButton = styled.button`
    padding: 14px 0;
    border-radius: ${({ theme }) => theme.radius.md};
    background: ${({ theme }) => theme.color.primary};
    color: ${({ theme }) => theme.color.onPrimary};
    font-weight: 700;
    transition: background-color ${({ theme }) => theme.transition}
    
    &:hover:not(diabled) {
    background: ${({ theme }) => theme.color.primaryHover};
    }

    &:disabled {
        opacity: 0.4;
    }
`;

const ListLink = styled(Link)`
    color: ${({ theme }) => theme.color.textSub};
    font-size: 14px;
    text-decoration: underline;
    text-underline-offset: 4px;

    &:hover {
        color: ${({ theme }) => theme.color.text};
    }
`;

