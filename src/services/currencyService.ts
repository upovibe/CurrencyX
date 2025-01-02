import axios from 'axios';

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;

if (!API_KEY || !BASE_URL) {
    throw new Error('Environment variables VITE_API_KEY and VITE_BASE_URL are required.');
}

/**
 * Interface for conversion rates object.
 */
interface ConversionRates {
    [currencyCode: string]: number;
}

/**
 * Interface for the API response.
 */
interface ApiResponse {
    conversion_rates: ConversionRates;
}

/**
 * Fetch the conversion rate between two currencies.
 * 
 * @param fromCurrency - The base currency (e.g., 'USD').
 * @param toCurrency - The target currency (e.g., 'EUR').
 * @returns Conversion rate from `fromCurrency` to `toCurrency`.
 * @throws Error if the request fails or the currency is not found.
 */

export const fetchConversionRate = async (
    fromCurrency: string,
    toCurrency: string
): Promise<number> => {
    try {
        const response = await axios.get<ApiResponse>(`${BASE_URL}/${API_KEY}/latest/${fromCurrency}`);
        
        if (response.status === 200) {
            const conversionRate = response.data.conversion_rates[toCurrency];
            if (conversionRate) {
                return conversionRate;
            } else {
                throw new Error(`Conversion rate for ${toCurrency} not found.`);
            }
        } else {
            throw new Error('Failed to fetch data from the API.');
        }
    } catch (error) {
        console.error('Error fetching currency conversion rate:', error);
        throw new Error('Failed to fetch conversion rates. Please check the API or your network connection.');
    }
};
