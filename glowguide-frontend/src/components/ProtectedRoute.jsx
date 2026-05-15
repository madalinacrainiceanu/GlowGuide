import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children, adminOnly = false }) {
  const token = localStorage.getItem('token');
  if (!token) return <Navigate to="/login" replace />;

  if (adminOnly) {
    const userData = localStorage.getItem('user');
    const user = userData ? JSON.parse(userData) : null;
    if (user?.rol !== 'admin') return <Navigate to="/dashboard" replace />;
  }

  return children;
}
