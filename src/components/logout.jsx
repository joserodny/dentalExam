import { useNavigate } from 'react-router-dom';

export const LogoutComponent = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Optional: notify backend (no real effect unless you use a blacklist)
      await fetch('/api/logout', {
        method: 'POST',
      });

      // Remove stored data
      localStorage.removeItem('token');
      localStorage.removeItem('user');

      // Redirect to login
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <button onClick={handleLogout} style={{ padding: '8px 16px', cursor: 'pointer' }}>
      Logout
    </button>
  );
};
