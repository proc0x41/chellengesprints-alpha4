import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { NoticeProvider } from './context/NoticeContext';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { FaqPage } from './pages/FaqPage';
import { HomePage } from './pages/HomePage';
import { MissionDetailPage } from './pages/MissionDetailPage';
import { MissionsPage } from './pages/MissionsPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { RankingPage } from './pages/RankingPage';
import { TeamPage } from './pages/TeamPage';

export function App() {
  return (
    <NoticeProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="sobre" element={<AboutPage />} />
          <Route path="integrantes" element={<TeamPage />} />
          <Route path="faq" element={<FaqPage />} />
          <Route path="contato" element={<ContactPage />} />
          <Route path="missoes" element={<MissionsPage />} />
          <Route path="missoes/:id" element={<MissionDetailPage />} />
          <Route path="ranking" element={<RankingPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </NoticeProvider>
  );
}
