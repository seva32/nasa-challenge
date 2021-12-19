import axios from 'axios';

import { API_URL, API_KEY } from '../utils/config';

export type GetNasaDataParams = {
    rover: string;
}

export default async ({ rover }: GetNasaDataParams) => {
    try {
        const response = await axios.get(`${API_URL}/${rover}/photos?sol=1000&api_key=${API_KEY}`);
        return response;
    } catch (error) {
        console.error('Error while getting data.');
    }
    return null;
};