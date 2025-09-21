// FIX: Renamed from firebaseService.ts to apiService.ts for clarity.
// FIX: Using relative URL for API calls to support production deployments.

const API_URL = '/api';

interface User {
    _id: string;
    email: string;
    fullName?: string;
    // Add other user properties as needed
}

interface AuthResponse {
    token: string;
    user: User;
}

const handleResponse = async (response: Response): Promise<AuthResponse> => {
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.msg || 'An error occurred');
    }
    return data as AuthResponse;
};

export const sendVerificationOtp = async (email: string): Promise<{ msg: string }> => {
    const response = await fetch(`${API_URL}/send-verification-otp`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.msg || 'Failed to send OTP');
    }
    return data;
};

export const register = async (userData: object): Promise<AuthResponse> => {
    const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
    return handleResponse(response);
};

export const login = async (email: string, password: string): Promise<AuthResponse> => {
    const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });
    return handleResponse(response);
};

export const googleLogin = async (googleToken: string): Promise<AuthResponse> => {
    const response = await fetch(`${API_URL}/google-login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: googleToken }),
    });
    // Google login response from backend might be slightly different
    const data = await response.json();
     if (!response.ok) {
        throw new Error(data.msg || 'An error occurred');
    }
    return data as AuthResponse;
};

export const getCurrentUser = async (token: string): Promise<User> => {
    const response = await fetch(`${API_URL}/me`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    if (!response.ok) {
        // If token is invalid/expired, server returns 401
        if (response.status === 401) {
            localStorage.removeItem('token');
        }
        const data = await response.json();
        throw new Error(data.msg || 'Failed to fetch user');
    }
    return response.json();
};
