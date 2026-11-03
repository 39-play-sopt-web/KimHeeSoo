import { Global, css, useTheme } from '@emotion/react';

const GlobalStyle = () => {
    const theme = useTheme();

    return (
        <Global
            styles={css`
             @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css');
             *, 
             *::before,
             *::after {
             box-sizing: border-box;
             margin: 0;
             padding: 0;
          }

          html {
          color-scheme: dark;
          }

          body {
            min-height: 100vh;
            background-color: ${theme.colors.background};
            color: ${theme.colors.text};
            font-family: ${theme.fonts.base};
            line-height: 1.5;
            -webkit-font-smoothing: antialiased;
          }

          a {
            color: inherit;
            text-decoration: none;
            }

          button {
            font: inherit;
            color: inherit;
            background: none;
            border: none;
            cursor: pointer;
          }

          img {
            display: block;
            max-width: 100%;
          }

          :focus-visible {
            outline: 2px solid ${theme.colors.primary};
            outline-offset: 2px;
          }

          ul, ol { list-style: none; }
        `}
        />
    );
};



export default GlobalStyle;

