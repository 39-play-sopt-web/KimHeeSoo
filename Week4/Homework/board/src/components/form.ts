import styled, { css } from "styled-components";

export const Field = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

export const FieldLabel = styled.label`
    font-size: 14px;
    font-weight: 600;
    color: ${({ theme }) => theme.color.textSub};
`;

const fieldStyle = css<{ $invalid?: boolean }>`
    width: 100%;
    padding: 14px 16px;
    border: 1px solid
        ${({ theme, $invalid }) => ($invalid ? theme.color.danger : theme.color.border)};
    border-radius: ${({ theme }) => theme.radius.md};
    background: ${({ theme }) => theme.color.surface};
    outline: none;
    transition: border-color ${({ theme }) => theme.transition};
    
    &:focus {
    border-color: ${({ theme, $invalid }) => ($invalid ? theme.color.danger : theme.color.primary)};
    }

    &::placeholder {
    color: ${({ theme }) => theme.color.textSub};
    }
`;

export const TextInput = styled.input<{ $invalid?: boolean }>`
    ${fieldStyle}
`;

export const TextArea = styled.textarea<{ $invalid?: boolean }>`
    ${fieldStyle}
    min-height: 200px;
    resize: vertical;
    line-height: 1.6;
`;

export const FieldFooter = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 12px;
    min-height: 20px;
    font-size: 13px;
`;

export const ErrorText = styled.p`
    color: ${({ theme }) => theme.color.danger};
`;

export const Counter = styled.span<{ $over: boolean }>`
    margin-left: auto;
    color: ${({ theme, $over }) => ($over ? theme.color.danger : theme.color.textSub)};
`;

export const ButtonRow = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 8px;
`;

const buttonBase = css`
    padding: 12px 20px;
    border-radius: ${({ theme }) => theme.radius.md};
    font-weight: 700;
    transition:
        background-color: ${({ theme }) => theme.transition};
        color: ${({ theme }) => theme.transition};

        &:disabled {
            opacity: 0.4;
            cursor: not-allowed;
        }
`;

export const PrimaryButton = styled.button`
    ${buttonBase}
    background: ${({ theme }) => theme.color.primary};
    color: ${({ theme }) => theme.color.onPrimary};
    
    &:hover:not(:disabled) {
        background: ${({ theme }) => theme.color.primaryHover};
    }
`;

export const SecondaryButton = styled.button`
    ${buttonBase}
    border: 1px solid ${({ theme }) => theme.color.border};
    color: ${({ theme }) => theme.color.text};
    
    &:hover:not(:disabled) {
        background: ${({ theme }) => theme.color.surfaceHover};
    }
`;