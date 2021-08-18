import { api } from '@/server/api';
import { reactive, readonly } from 'vue';

export interface User {
	username: string;
}

export interface LoginRequest {
	username: string;
	password: string;
}

export interface LoginResponse {
	success: boolean;
	error?: string;
}

const user = reactive<User>({
	username: '',
});

export const useUsers = (): User => readonly(user);

export const userService = {
	login: async (
		username: string,
		password: string
	): Promise<LoginResponse> => {
		const response = (
			await api.patch<LoginResponse>('/user', { username, password })
		).data;

		if (response && response.success) user.username = username;

		return response;
	},
	register: async (
		username: string,
		password: string
	): Promise<LoginResponse> => {
		const response = (
			await api.post<LoginResponse>('/user', { username, password })
		).data;

		if (response && response.success) user.username = username;

		return response;
	},
};
