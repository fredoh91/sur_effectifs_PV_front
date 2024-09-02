// api.js
export const fetchFromAPI = async (endpoint, method = 'GET', body = null) => {
    try {
        const response = await fetch(`http://localhost/sur_effectifs_PV_API/public/index.php/api/${endpoint}`, {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: body ? JSON.stringify(body) : null,
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return response.json();
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
        throw error;
    }
};