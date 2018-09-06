import axios from 'axios';
import merge from 'lodash/merge';

import { API_URL, BASE_URL } from 'app/config/http-client';

const defaultHeader = {
  origin: BASE_URL
};

const getConfig = (config = {}) => {
  config.method = config.method || 'get';
  config.responseType = config.responseType || 'json';
  config.headers = merge(config.headers, defaultHeader);
  config.url = (config.baseURL || API_URL) + (config.url || '');
  // Add CORS credentials on browser side
  config.withCredentials = config.withCredential ? config.withCredentials : true;

  return config;
};

export default async (config = {}) => {
  try {
    const { data } = await axios(getConfig(config));

    return data;
  } catch (error) {
    const {
      response: {
        data
      } = {},
      stack
    } = error;

    throw data || stack;
  }
};
