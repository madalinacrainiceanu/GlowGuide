import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import RutinaMea from './pages/RutinaMea';
import Profil from './pages/Profil';
import Jurnal from './pages/Jurnal';
import Forum from './pages/Forum';
import DetaliiPostare from './pages/DetaliiPostare';
import AdminModerare from './pages/AdminModerare';
import Chatbot from './pages/Chatbot';
import ContulMeu from './pages/ContulMeu';
import ProfilPublic from './pages/ProfilPublic';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  useEffect(() => {
    const savedTheme = localStorage.getItem('darkMode') === 'true';
    document.body.setAttribute('data-theme', savedTheme ? 'dark' : 'light');
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/rutina" element={<ProtectedRoute><RutinaMea /></ProtectedRoute>} />
        <Route path="/profil" element={<ProtectedRoute><Profil /></ProtectedRoute>} />
        <Route path="/jurnal" element={<ProtectedRoute><Jurnal /></ProtectedRoute>} />
        <Route path="/forum" element={<ProtectedRoute><Forum /></ProtectedRoute>} />
        <Route path="/forum/:id" element={<ProtectedRoute><DetaliiPostare /></ProtectedRoute>} />
        <Route path="/admin/moderare" element={<ProtectedRoute adminOnly><AdminModerare /></ProtectedRoute>} />
        <Route path="/chatbot" element={<ProtectedRoute><Chatbot /></ProtectedRoute>} />
        <Route path="/cont" element={<ProtectedRoute><ContulMeu /></ProtectedRoute>} />
        <Route path="/profil-public/:membruId" element={<ProtectedRoute><ProfilPublic /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;

