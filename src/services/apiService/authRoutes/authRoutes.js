
import ApiClient from '../apiClient';

const apiClient = new ApiClient(process.env.REACT_APP_API_URL);

const ROUTE = '/auth';

export const register = (user) => apiClient.post(`${ROUTE}/register`, user)
    .then(response => response.data);

export const authenticate = (user) => apiClient.post(`${ROUTE}/authenticate`, user)
    .then(response => response.data);
