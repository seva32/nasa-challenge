import axios from 'axios';

import { API_URL, API_KEY } from '../utils/config';

export type GetNasaDataParams = {
    rover: string;
    sol?: string;
    earth?: string;
}

export default async ({ rover, sol, earth }: GetNasaDataParams) => {
    const day = sol ? `sol=${sol}` : earth ? `earth_date=${earth}` : '';
    try {
        const response = await axios.get(`${API_URL}/${rover}/photos?${day}&api_key=${API_KEY}`);
        if (!response.data.photos.length) throw new Error();
        return response;
    } catch (error) {
        throw new Error(`Check params: sol - ${sol}, earth_date - ${earth}`);
    }
};