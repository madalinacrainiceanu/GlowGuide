import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import RutinaMea from './pages/RutinaMea';
import Profil from './pages/Profil';
import Jurnal from './pages/Jurnal';
import Forum from './pages/Forum';
import DetaliiPostare from './pages/DetaliiPostare';
import AdminModerare from './pages/AdminModerare';
import Chatbot from './pages/Chatbot';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/rutina" element={<RutinaMea />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/jurnal" element={<Jurnal />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/forum/:id" element={<DetaliiPostare />} />
        <Route path="/admin/moderare" element={<AdminModerare />} />
        <Route path="/chatbot" element={<Chatbot />} />
      </Routes>
    </Router>
  );
}

export default App;
