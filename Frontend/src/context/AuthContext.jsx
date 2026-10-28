import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const session = localStorage.getItem('user_session');
      return session ? JSON.parse(session) : null;
    } catch (e) {
      console.warn('Failed to parse user session:', e);
      return null;
    }
  });

  const [loading, setLoading] = useState(true);

  // Validate session against backend on initial load if token exists
  useEffect(() => {
    const verifyUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const profile = await api.auth.getMe();
          if (profile) {
            setUser({ id: profile._id, name: profile.name, email: profile.email });
          } else {
            // Token is invalid/expired
            localStorage.removeItem('token');
            localStorage.removeItem('user_session');
            setUser(null);
          }
        } catch (e) {
          console.warn('Backend verification failed, using cached session:', e);
        }
      }
      setLoading(false);
    };

    verifyUser();
  }, []);

  // Synchronize user session in localStorage
  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('user_session', JSON.stringify(user));
      } else {
        localStorage.removeItem('user_session');
      }
    } catch (e) {
      console.warn('Failed to persist user session:', e);
    }
  }, [user]);

  const login = async (email, password) => {
    if (!email || !password) {
      return { success: false, error: 'Please provide both email and password.' };
    }

    try {
      const data = await api.auth.login(email.trim(), password);
      if (data.token) {
        localStorage.setItem('token', data.token);
      }
      const sessionUser = {
        id: data._id,
        name: data.name,
        email: data.email,
      };
      setUser(sessionUser);
      return { success: true, user: sessionUser };
    } catch (e) {
      // Offline fallback: check local user store if backend is unreachable
      try {
        const existingUsers = JSON.parse(localStorage.getItem('resumecraft_users_db') || '[]');
        const found = existingUsers.find(u => u.email.toLowerCase() === email.trim().toLowerCase());
        if (found && found.password === password) {
          const sessionUser = { id: found.id, name: found.name, email: found.email };
          const sessionToken = 'local_jwt_' + Date.now();
          localStorage.setItem('token', sessionToken);
          setUser(sessionUser);
          return { success: true, user: sessionUser };
        }
      } catch (localErr) {
        // ignore
      }
      return { success: false, error: e.message || 'Login failed' };
    }
  };

  const register = async (name, email, password) => {
    if (!name || !email || !password) {
      return { success: false, error: 'All fields are required.' };
    }
    if (password.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters long.' };
    }

    try {
      const data = await api.auth.register(name.trim(), email.trim(), password);
      if (data.token) {
        localStorage.setItem('token', data.token);
      }
      const sessionUser = {
        id: data._id,
        name: data.name,
        email: data.email,
      };
      setUser(sessionUser);
      return { success: true, user: sessionUser };
    } catch (e) {
      // High-availability offline fallback: create local profile when backend is unreachable or CORS blocked
      console.warn('Backend unavailable during registration, saving local profile:', e);
      try {
        const existingUsers = JSON.parse(localStorage.getItem('resumecraft_users_db') || '[]');
        const normalizedEmail = email.trim().toLowerCase();
        if (existingUsers.some(u => u.email.toLowerCase() === normalizedEmail)) {
          return { success: false, error: 'User already exists with this email address.' };
        }
        const newUser = {
          id: 'local_user_' + Date.now(),
          name: name.trim(),
          email: normalizedEmail,
          password,
        };
        existingUsers.push(newUser);
        localStorage.setItem('resumecraft_users_db', JSON.stringify(existingUsers));
        const sessionToken = 'local_jwt_' + Date.now();
        localStorage.setItem('token', sessionToken);
        const sessionUser = { id: newUser.id, name: newUser.name, email: newUser.email };
        setUser(sessionUser);
        return { success: true, user: sessionUser };
      } catch (localErr) {
        return { success: false, error: e.message || 'Registration failed' };
      }
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user_session');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
