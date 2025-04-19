const API_URL = 'https://wedwise-capstone.onrender.com/api';

// Helper function to get auth token
const getAuthToken = () => localStorage.getItem('token');

// Helper function to handle API responses
const handleResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'API request failed');
  }
  return data;
};
export const getGuestsByWedding = async (weddingId) => {
  try {
    const token = getAuthToken();
    if (!token) throw new Error('No auth token');

    const response = await fetch(`${API_URL}/guests/wedding/${weddingId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Get guests error:', error);
    throw error;
  }
};
// Auth API calls
export const login = async (credentials) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    const data = await handleResponse(response);
    if (data.token) {
      localStorage.setItem('token', data.token);
    }
    return data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const updateGuest = async (guestId, guestData) => {
  try {
    const token = getAuthToken();
    if (!token) throw new Error('No auth token');

    const response = await fetch(`${API_URL}/guests/${guestId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(guestData),
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Update guest error:', error);
    throw error;
  }
};

export const deleteGuest = async (guestId) => {
  try {
    const token = getAuthToken();
    if (!token) throw new Error('No auth token');

    const response = await fetch(`${API_URL}/guests/${guestId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Delete guest error:', error);
    throw error;
  }
};

export const register = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    const data = await handleResponse(response);
    if (data.token) {
      localStorage.setItem('token', data.token);
    }
    return data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

// Protected API calls
export const fetchUserData = async () => {
  try {
    const token = getAuthToken();
    if (!token) throw new Error('No auth token');

    const response = await fetch(`${API_URL}/auth/me`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Fetch user data error:', error);
    throw error;
  }
};

export const fetchData = async (endpoint) => {
  try {
    const token = getAuthToken();
    if (!token) throw new Error('No auth token');

    const response = await fetch(`${API_URL}/${endpoint}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Fetch data error:', error);
    throw error;
  }
};

export const postData = async (endpoint, data) => {
  try {
    const token = getAuthToken();
    if (!token) throw new Error('No auth token');

    const response = await fetch(`${API_URL}/${endpoint}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Post data error:', error);
    throw error;
  }
};