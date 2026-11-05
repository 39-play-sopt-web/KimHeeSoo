import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
*, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
    min-height: 100vh;
    background: ${({ theme }) => theme.color.background};
    color: ${({ theme }) => theme.color.text};
    font-family: "Pretendard", -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
    -webkit-font-smoothing: antialiased;
}

button, input, textarea, select {
    font: inherit;
    color: inherit;}

button {
    border: none;
    background: none;
    cursor: pointer;
}

button:disabled {
    cursor: not-allowed;
}

a {
    color: inherit;
    text-decoration: none;
}

ul, ol {
    list-style: none;
}
`;
