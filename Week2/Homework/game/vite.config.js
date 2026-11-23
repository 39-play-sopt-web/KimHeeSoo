import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin' // css.js 파일을 CSS로 변환해주는 플러그인 추가

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), vanillaExtractPlugin()],
}) // vanillaExtractPlugin()을 통해 빌드 시점에 .css.js 스타일을 정적 CSS 파일로 추출할 수 있음