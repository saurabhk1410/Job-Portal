import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Attempt to get user by checking the cookie via the backend endpoint
        const response = await fetch('http://localhost:5000/api/auth/check', {
            credentials: 'include'
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
          console.log('Authenticated via cookie.');
        } else {
          // If not authenticated (401), clear user state
          setUser(null);
          console.log('Not authenticated via cookie.');
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []); // Run once on mount

  const login = async (sapId, password) => {
    try {
      console.log("Login attempt");
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sapId, password }),
        credentials: 'include'
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      // Backend now sets HTTP-only cookie, so no token in response body
      // We can optionally refetch the user or rely on the auth check on next render/route change
      // For simplicity, let's refetch the user using the new check endpoint
      const authCheckResponse = await fetch('http://localhost:5000/api/auth/check', {
          credentials: 'include'
      });
      if (authCheckResponse.ok) {
          const authCheckData = await authCheckResponse.json();
          setUser(authCheckData.user);
          console.log('Login successful, user set from auth check.');
      } else {
          // Should not happen if login was ok and cookie was set
          console.error('Login successful, but auth check failed.');
          setUser(null); // Ensure user is null if auth check fails unexpectedly
      }

      return data; // Return original response data (excluding token)

    } catch (error) {
      console.error('Login process error:', error);
      throw error;
    }
  };

  const signup = async (userData) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
        credentials: 'include'
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Signup failed');
      }

      // Backend now sets HTTP-only cookie, no token in body
      // Refetch user via auth check
      const authCheckResponse = await fetch('http://localhost:5000/api/auth/check', {
        credentials: 'include'
      });
      if (authCheckResponse.ok) {
          const authCheckData = await authCheckResponse.json();
          setUser(authCheckData.user);
          console.log('Signup successful, user set from auth check.');
      } else {
          console.error('Signup successful, but auth check failed.');
          setUser(null);
      }

      return data; // Return original response data (excluding token)

    } catch (error) {
      console.error('Signup process error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
        // Call backend logout endpoint to clear the cookie
        await fetch('http://localhost:5000/api/auth/logout', {
            method: 'POST',
            credentials: 'include'
        });
    } catch (error) {
        console.error('Logout failed:', error);
        // Still proceed with clearing local state even if backend call fails
    }
    // Clear user state locally
    setUser(null);
    console.log('Logged out.');
  };

  const value = {
    user,
    login,
    signup,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};  