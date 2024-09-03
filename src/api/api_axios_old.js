import axios from 'axios';

export const fetchFromAPI = async (endpoint, method = 'GET', body = null) => {
  try {
    const response = await axios({
      method,
      url: `http://localhost/sur_effectifs_PV_API/public/index.php/api/${endpoint}`,
      data: body,
    });

    return response.data;
  } catch (error) {
    console.error('There has been a problem with your axios operation:', error);
    throw error;
  }
};