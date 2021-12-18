import axios from 'axios';

import { API_URL, API_KEY } from '../utils/config';

export default async () => {
    try {
        const response = await axios.get(`${API_URL}/curiosity/photos?sol=1000&api_key=${API_KEY}`);
        return response;
    } catch (error) {
        console.error('Error while getting data.');
    }
    return null;
};