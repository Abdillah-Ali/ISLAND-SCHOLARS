import { createContext, useState, useContext, useEffect } from 'react';
import { mockUsers } from '../data/mockData';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for saved user in localStorage on initial load
  useEffect(() => {
    const savedUser = localStorage.getItem('islandScholarsUser');
    if (savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('islandScholarsUser');
      }
    }
    setLoading(false);
  }, []);

  // Mock login function
  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      // Simulate API call delay
      setTimeout(() => {
        const user = mockUsers.find(u => 
          u.email.toLowerCase() === email.toLowerCase() && u.password === password
        );
        
        if (user) {
          const { password, ...userWithoutPassword } = user;
          setCurrentUser(userWithoutPassword);
          localStorage.setItem('islandScholarsUser', JSON.stringify(userWithoutPassword));
          resolve(userWithoutPassword);
        } else {
          reject(new Error('Invalid email or password'));
        }
      }, 800);
    });
  };

  // Mock register function
  const register = (userData) => {
    return new Promise((resolve, reject) => {
      // Simulate API call delay
      setTimeout(() => {
        // Check if email already exists
        if (mockUsers.some(u => u.email.toLowerCase() === userData.email.toLowerCase())) {
          reject(new Error('Email already in use'));
          return;
        }
        
        // Create new user
        const newUser = {
          id: `user-${Date.now()}`,
          ...userData,
          createdAt: new Date().toISOString()
        };
        
        // In a real app, we would save to backend
        // Here we're just updating our local state
        mockUsers.push(newUser);
        
        // Log in the user after registration
        const { password, ...userWithoutPassword } = newUser;
        setCurrentUser(userWithoutPassword);
        localStorage.setItem('islandScholarsUser', JSON.stringify(userWithoutPassword));
        
        resolve(userWithoutPassword);
      }, 800);
    });
  };

  // Logout function
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('islandScholarsUser');
  };

  const value = {
    currentUser,
    login,
    register,
    logout,
    isAuthenticated: !!currentUser
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};