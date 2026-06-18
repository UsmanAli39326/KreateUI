import React, { createContext, useContext, useState, useEffect } from 'react';
import apiService, { getToken, clearTokens, setTokens } from '../services/apiService';
import PageLoader from '../components/Common/PageLoader';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const response = await apiService.get('/user/profile');
      setUser(response.data || response); // Adjust depending on actual response shape
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
      clearTokens();
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = getToken();
    if (token) {
      fetchProfile();
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (token, refreshToken) => {
    setTokens(token, refreshToken);
    await fetchProfile();
  };

  const logout = async () => {
    try {
      // Optional: inform backend
      await apiService.post('/auth/logout', {});
    } catch (e) {
      console.error('Logout error', e);
    } finally {
      clearTokens();
      setUser(null);
      window.location.href = '/auth'; // Redirect to login
    }
  };

  const value = {
    user,
    loading,
    login,
    logout,
    setUser
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading ? children : <PageLoader message="Loading..." isFullScreen={true} />}
    </AuthContext.Provider>
  );
};
