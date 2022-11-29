import axios, { AxiosRequestConfig } from 'axios';

export const fetcher = async (url: string, config: AxiosRequestConfig) => {
  try {
    const response = await axios({ url, ...config });
    const responseJson = await response.data;
    return responseJson;
  } catch (error) {
    throw error;
  }
};
