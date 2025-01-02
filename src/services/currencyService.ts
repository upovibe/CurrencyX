import axios from 'axios';
import { currencyMetadata, defaultCurrencyMeta } from '../utils/currencyMetadata';

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
            const { conversion_rates } = response.data;
            if (conversion_rates && conversion_rates[toCurrency] != null) {
                return conversion_rates[toCurrency];
            } else {
                throw new Error(`Conversion rate for ${toCurrency} not found.`);
            }
        } else {
            throw new Error(`API responded with status ${response.status}: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error fetching currency conversion rate:', error);
        throw new Error('Failed to fetch conversion rates. Please check the API or your network connection.');
    }
};

/**
 * Fetch the list of supported currencies.
 * 
 * @param baseCurrency - The base currency to fetch rates for (default is 'USD').
 * @returns An object containing all supported currencies and their conversion rates.
 * @throws Error if the request fails.
 */
export const fetchSupportedCurrencies = async (
    baseCurrency: string = 'USD'
): Promise<{ [code: string]: { label: string; symbol: string } }> => {
    try {
        const response = await axios.get<ApiResponse>(`${BASE_URL}/${API_KEY}/latest/${baseCurrency}`);
        
        if (response.status === 200) {
            const { conversion_rates } = response.data;
            if (conversion_rates) {
                return Object.keys(conversion_rates).reduce((acc, code) => {
                    acc[code] = currencyMetadata[code] || defaultCurrencyMeta;
                    return acc;
                }, {} as { [code: string]: { label: string; symbol: string } });
            } else {
                throw new Error('No conversion rates found in the API response.');
            }
        } else {
            throw new Error(`API responded with status ${response.status}: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error fetching supported currencies:', error);
        throw new Error('Failed to fetch supported currencies. Please check the API or your network connection.');
    }
};