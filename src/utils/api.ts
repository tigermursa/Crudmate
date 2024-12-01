import { user } from "@/types/types";

const BASE_URL = 'http://localhost:5000/api/v1';

export const api = {
    createUser: async (data: user) => {
        const response = await fetch(`${BASE_URL}/create-user`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error('Failed to create user');
        return response.json();
    },

    getAllUsers: async () => {
        const response = await fetch(`${BASE_URL}/get-all-users`);
        if (!response.ok) throw new Error('Failed to fetch users');
        return response.json();
    },

    getUserByUID: async (uid: string) => {
        const response = await fetch(`${BASE_URL}/get-user/${uid}`);
        if (!response.ok) throw new Error('Failed to fetch user');
        return response.json();
    },

    deleteUserByUID: async (uid: string) => {
        const response = await fetch(`${BASE_URL}/delete-user/${uid}`, {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to delete user');
        return response.json();
    },

    updateUserByUID: async (uid: string, data: user) => {
        // Destructure the `data` object and exclude the `_id` field
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { _id, ...updateData } = data;

        const response = await fetch(`${BASE_URL}/update-user/${uid}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updateData), // Send only the fields to update (no _id)
        });

        if (!response.ok) throw new Error('Failed to update user');
        return response.json();
    },

    searchUsers: async (query: string) => {
        const response = await fetch(`${BASE_URL}/search-users?query=${query}`);
        if (!response.ok) throw new Error('Failed to search users');
        return response.json();
    },
};
