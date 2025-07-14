import { Route, Routes } from 'react-router-dom';
import AdminPage from '../pages/AdminPage';
import HomePage from '../pages/HomePage';
import JobDetail from '../pages/JobDetail';
import ApplyPage from '../pages/ApplyPage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/job/:id" element={<JobDetail />} />
      <Route path="/apply/:id" element={<ApplyPage />} />
    <Route path="/admin/job/:id" element={<AdminPage />} />

    </Routes>
  );
}
