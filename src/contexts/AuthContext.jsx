import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('authToken'));
    const [user, setUser] = useState(null); // Could store user details decoded from token or fetched from API
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedToken = localStorage.getItem('authToken');
        if (storedToken) {
            setToken(storedToken);
            // TODO: Decode token to get user info or fetch user profile
            // For now, just assume token means logged in for placeholder
            // setUser({ username: 'admin' }); // Placeholder, replace with actual user data from token/API
        }
        setLoading(false);
    }, []);

    const login = (newToken, userData) => {
        localStorage.setItem('authToken', newToken);
        setToken(newToken);
        setUser(userData); // Store user data passed during login
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        setToken(null);
        setUser(null);
    };

    const isAuthenticated = () => {
        // Add more robust checks if needed, e.g., token expiration
        return !!token;
    };

    if (loading) {
        return <p>Carregando autenticação...</p>; // Or a proper loading spinner
    }

    return (
        <AuthContext.Provider value={{ token, user, login, logout, isAuthenticated, setUser, setToken }}>
            {children}
        </AuthContext.Provider>
    );
};

