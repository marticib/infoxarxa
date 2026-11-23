import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { FullscreenProvider } from './state/FullscreenContext.jsx';
import { ProgressProvider } from './state/ProgressContext.jsx';
import { ThemeProvider } from './state/ThemeContext.jsx';
import './styles/fonts.css';
import './styles/tokens.css';
import './styles/base.css';
import './styles/layout.css';
import './styles/components.css';
import './styles/lesson.css';
import './styles/special.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <ProgressProvider>
        <FullscreenProvider>
          <App />
        </FullscreenProvider>
      </ProgressProvider>
    </ThemeProvider>
  </StrictMode>
);
