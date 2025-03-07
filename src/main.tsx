import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import LottoPage from './LottoPage.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LottoPage />
  </StrictMode>
);
