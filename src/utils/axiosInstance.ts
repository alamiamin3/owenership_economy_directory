import axios from "axios";
const AIRTABLE_ACCESS_TOKEN = import.meta.env.VITE_AIRTABLE_ACCESS_TOKEN; 
const AIRTABLE_BASE_URL = import.meta.env.VITE_AIRTABLE_BASE_URL;
export const LOCATION_TABLE = import.meta.env.VITE_LOCATION_TABLE;
export const FINANCIAL_INFO_TABLE = import.meta.env.VITE_FINANCIAL_INFO_TABLE;
export const TOKEN_INFO_TABLE = import.meta.env.VITE_TOKEN_INFO_TABLE;
export const LINKS_TABLE = import.meta.env.VITE_LINKS_TABLE;
export const CONTACT_TABLE = import.meta.env.VITE_CONTACT_TABLE;
export const ORGANIZATION_TABLE = import.meta.env.VITE_ORGANIZATION_TABLE;

const airTableApi = axios.create({
    baseURL: AIRTABLE_BASE_URL,
    headers: {
        "Authorization": `Bearer ${AIRTABLE_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
    },
});

export default airTableApi;