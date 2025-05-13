import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000'; // Backend URL

const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor to add JWT token to requests
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

const login = async (username, password) => {
    try {
        const response = await apiClient.post('/auth/login', { username, password });
        return response.data; // Should return { token: "..." }
    } catch (error) {
        console.error('Login failed:', error.response ? error.response.data : error.message);
        throw error.response ? error.response.data : new Error('Login failed');
    }
};

// Add other auth-related functions if needed, e.g., register, logout (if backend supports)

const authService = {
    login,
    // getCurrentUser, // Potentially decode token or fetch /me endpoint
};

export default authService;

