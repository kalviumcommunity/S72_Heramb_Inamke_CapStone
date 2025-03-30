const API_URL = 'https://wedwise-capstone.onrender.com/api'; // Updated to point to the backend

export const fetchData = async () => {
    try {
        const response = await fetch(`${API_URL}/data`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error; // Handle or re-throw as needed
    }
};