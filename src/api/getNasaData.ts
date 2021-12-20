import axios from 'axios';

import { API_URL, API_KEY } from '../utils/config';

import { NasaDataActionTypes } from '../store/actions/nasaDataActions';
import { useAppDispatch } from "../store/store";

export type GetNasaDataParams = {
    rover: string;
    sol?: string;
    earth?: string;
}

export default async ({ rover, sol, earth }: GetNasaDataParams) => {
    const dispatch = useAppDispatch();
    const day = sol ? `sol=${sol}` : earth ? `earth_date=${earth}` : '';
    try {
        const response = await axios.get(`${API_URL}/${rover}/photos?${day}&api_key=${API_KEY}`);
        // if (!response.data.photos.length) throw new Error('No data');
        return response;
    } catch (error) {
        dispatch({ type: NasaDataActionTypes.GET_NASA_DATA_FAILURE, payload: 'Error loading photos.' })
    }
    return null;
};