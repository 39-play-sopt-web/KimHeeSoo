import { useState, type SubmitEvent } from "react";
import { useSearchParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { getPosts } from "../apis/post";
import { postKeys } from "../apis/queryKeys";
import PostCard from "../components/PostCard";
import { StatusMessage } from "../components/StatusMessage";

const KEYWORD_MIN_LENGTH = 2;

export default function PostListPage() {
  const [searchParams, setSerachParams] = useSearchParams();
  const keyword = searchParams.get("keyword") ?? "";

  const [input, setInput] = useState(keyword);
  const trimmed = input.trim();
  const canSearch = trimmed.length >= KEYWORD_MIN_LENGTH;

  const { data, isPending, isError, error } = useQuery({
    queryKey: postKeys.list(keyword),
    queryFn: () => getPosts({ keyword }),

  });

  const handleSearch = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSearch) return;
    setSerachParams({ keyword: trimmed });
  };

  const handleInputChange = (value: string) => {
    setInput(value);
    if (value.trim() == "" && keyword) setSerachParams({});
  };

  return (
    <section>
      <h1 className="sr-only">게시글 목록</h1>
      <SearchForm onSubmit={handleSearch} role="search">
        <label htmlFor="keyword" className="sr-only">
          제목으로 검색
        </label>
        <SearchInput
          id="keyword"
          type="search"
          value={input}
          onChange={(e) => handleInputChange(e.target.value)}
          placeholder="제목으로 검색 (2자 이상)"
          maxLength={50}
        />
        <SearchButton type="submit" disabled={!canSearch}>
          검색
        </SearchButton>
      </SearchForm>

      {isPending ? (
        <StatusMessage>게시글을 불러오는 중...</StatusMessage>
      ) : isError ? (
        <StatusMessage>목록을 불러오지 못했어요. ({error.message})</StatusMessage>
      ) : data.posts.length === 0 ? (
        <StatusMessage>
          {keyword ? `"${keyword}" 검색 결과가 없어요.` : "아직 게시글이 없어요."}
        </StatusMessage>
      ) : (
        <List>
          {data.posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </List>

      )}
    </section>
  );
}

const SearchForm = styled.form`
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
`;

const SearchInput = styled.input`
  flex: 1,
  padding: 12px 16px;
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.color.surface};
  outline: none;
  transition: border-color ${({theme }) => theme.color.primary};
  
  &: focus {
    border-color: ${({ theme }) => theme.color.primary};
  }
    
  &::placeholder {
    color: ${({ theme }) => theme.color.primary};
  }  
`;

const SearchButton = styled.button`
  padding: 0 20px;
  border-raidus: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.color.primary};
  color: ${({ theme }) => theme.color.onPrimary};
  font-weight: 700;
  transition: background-color ${({ theme }) => theme.transition};
  
  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.color.primaryHover};
  }
    
  &:disabled {
    opacity: 0.4;
  }
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

