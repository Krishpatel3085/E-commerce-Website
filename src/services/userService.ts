import api from '../api/config';
// import { Product } from '../types';

export const UserService = {

    createUser: async (userData: { firstName: string; lastName: string; email: string; password: string; }) => {
        const response = await api.post('api/User/register', userData);
        return response.data;
    },

    loginUser: async (credentials: { email: string; password: string; }) => {
        const response = await api.post('api/User/login', credentials);
        return response.data;
    }

};