import axios from 'axios';

export const BACKEND_ULR = 'http://localhost:3030/api';

export const apiClient = axios.create({
    baseURL: BACKEND_ULR,
    headers: {
        'Content-Type': 'application/json',
    },
});
