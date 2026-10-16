import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/reset.css';
import { themeClass } from './styles/theme.css.js'; // createTheme이 만든 테마 클래스 이름'
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <div className={themeClass}> 
    <App />
    </div>
  </StrictMode>,
);
