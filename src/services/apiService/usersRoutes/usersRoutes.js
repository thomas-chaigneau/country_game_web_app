import ApiClient from '../apiClient';

const apiClient = new ApiClient(process.env.REACT_APP_API_URL);

const ROUTE = '/api';

export const getUsers = () => apiClient.get(`${ROUTE}/users`)
    .then(response => response.data);

export const deleteUser = (id) => apiClient.delete(`${ROUTE}/users/${id}`)
    .then(response => response.data);
