// @flow

import ApiClient from '../apiClient';

const apiClient = new ApiClient(process.env.REACT_APP_API_URL);

const ROUTE = '/api/games';

export const getQuestion = (gameName: Sting) => apiClient.get(`${ROUTE}/${gameName}`)
    .then(response => response.data);

export const sendAnswer = (gameName: Sting, country: String, answer: number) => {
    return apiClient.post(`${ROUTE}/${gameName}/answer/${country}`, {answer})
    .then(response => response.data);
};

export const sendPoints = (gameName: String, userId: String, points: number) => {
    return apiClient.post(`${ROUTE}/${gameName}/user/${userId}/closeGame`, {points})
    .then(response => response.data);
};
