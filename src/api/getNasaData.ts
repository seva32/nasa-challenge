import axios from "axios";
import { API_URL, API_KEY } from "../utils/config";

export type GetNasaDataParams = {
  rover: string;
  sol?: string;
  earth?: string;
};

export default async function getNasaData({
  rover,
  sol,
  earth,
}: GetNasaDataParams) {
  const day = sol ? `sol=${sol}` : earth ? `earth_date=${earth}` : "";
  const url = `${API_URL}/${rover}/photos?${day}&api_key=${API_KEY}`;
  try {
    const response = await axios.get(url);
    return response;
  } catch (error) {
    throw new Error("Error loading photos.");
  }
}
