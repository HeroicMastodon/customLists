import { api, ApiResponse, handleException } from '@/server/api';
import { AxiosError } from 'axios';
import { reactive, readonly } from 'vue';

export interface User {
	username: string;
}

export interface LoginRequest {
	username: string;
	password: string;
}

export interface LoginResponse extends ApiResponse {
	user?: User;
	token?: string;
}

export interface UserStore {
	user: User;
	token?: string;
}


const store = reactive<UserStore>({
	user: {
		username: ""
	}
});

export const useUsers = (): User => readonly(store.user);
export const userService = {
	login: async (
		username: string,
		password: string
	): Promise<LoginResponse> => {
		try {
			const response = (
				await api.patch<LoginResponse>('/user', { username, password })
			).data;

			if (response && response.success && response.user) store.user.username = response.user.username;

			return response;
		} catch (e) {
			return handleException(e);
		}
	},
	register: async (
		username: string,
		password: string
	): Promise<LoginResponse> => {
		try {
			const response = (
				await api.post<LoginResponse>('/user', { username, password })
			).data;

			if (response && response.success && response.user) store.user = response.user;

			return response;
		} catch (e) {
			return handleException(e);
		}
	},
};
