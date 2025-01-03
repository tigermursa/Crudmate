import { user } from "@/types/types";

const BASE_URL = 'https://crudemate-server.vercel.app/api/v1';

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

    getAllDeletedUsers: async () => {
        const response = await fetch(`${BASE_URL}/users/deleted`);
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

    deleteUserByUIDToggle: async (uid: string) => {
        const response = await fetch(`${BASE_URL}/user/${uid}/toggle-delete`, {
            method: 'PATCH',
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



};

// Route to toggle user delete status
//router.patch('/user/:uid/toggle-delete', toggleUserDeleteStatusController);

// Route to get deleted users
//router.get('/users/deleted', getDeletedUsersController);