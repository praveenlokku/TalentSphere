import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Register a student
    const registerStudent = async (userData, profileData) => {
        setLoading(true);
        try {
            // Register the user first
            const userResponse = await axios.post('/api/register/', userData);
            
            // Then create the student profile
            if (userResponse.data && userResponse.data.id) {
                await axios.post('/api/student-profile/', {
                    user: userResponse.data.id,
                    ...profileData
                });
                
                return { success: true };
            }
            return { success: false, error: 'Failed to create user account.' };
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
            return { success: false, error: err.response?.data?.message || 'Registration failed' };
        } finally {
            setLoading(false);
        }
    };

    // Register a project owner
    const registerProjectOwner = async (userData, profileData) => {
        setLoading(true);
        try {
            // Register the user first
            const userResponse = await axios.post('/api/register/', userData);
            
            // Then create the project owner profile
            if (userResponse.data && userResponse.data.id) {
                await axios.post('/api/project-owner-profile/', {
                    user: userResponse.data.id,
                    ...profileData
                });
                
                return { success: true };
            }
            return { success: false, error: 'Failed to create user account.' };
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
            return { success: false, error: err.response?.data?.message || 'Registration failed' };
        } finally {
            setLoading(false);
        }
    };

    // Login function
    const login = async (email, password) => {
        setLoading(true);
        try {
            const response = await axios.post('/api/login/', { email, password });
            setCurrentUser(response.data);
            localStorage.setItem('user', JSON.stringify(response.data));
            return { success: true };
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
            return { success: false, error: err.response?.data?.message || 'Login failed' };
        } finally {
            setLoading(false);
        }
    };

    // Logout function
    const logout = () => {
        localStorage.removeItem('user');
        setCurrentUser(null);
    };

    const value = {
        currentUser,
        error,
        loading,
        registerStudent,
        registerProjectOwner,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider; 