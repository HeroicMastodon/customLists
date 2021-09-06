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
	authToken?: string;
	expiration?: string;
}

export interface UserStore {
	user: User;
	authToken?: string;
}

const store = reactive<UserStore>({
	user: {
		username: '',
	},
});

function handleValidResponse(data: LoginResponse, updateToken: boolean) {
	store.user.username = data.user?.username ?? '';

	if (updateToken) {
		store.authToken = data.authToken;
		api.updateApiHeaders(store.authToken ?? '', data.expiration ?? '');
	}
}
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

			if (response && response.success && response.user) {
				handleValidResponse(response, true);
			}

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

			if (response && response.success && response.user) {
				handleValidResponse(response, true);
			}

			return response;
		} catch (e) {
			return handleException(e);
		}
	},
	authenticate: async () => {
		try {
			const response = await api.get<LoginResponse>('/user');

			const isSuccess = response.status == 200;

			if (isSuccess) {
				const data = response.data;
				handleValidResponse(data, false);
			}

			return isSuccess;
		} catch (error) {
			handleException(error);
		}
	},
	logout: async () => {
		try {
			const response = await api.delete('/user');

			const isSuccess = response.status == 200;

			if (isSuccess) {
				api.updateApiHeaders("", "");
				store.user.username = "";
				store.authToken = "";
			}

			return isSuccess;
		} catch (error) {
			handleException(error);
		}
	},
	hardLogout: async () => {
		try {
			const response = await api.delete('/user/hard');

			const isSuccess = response.status == 200;

			if (isSuccess) {
				api.updateApiHeaders("", "");
				store.user.username = "";
				store.authToken = "";
			}

			return isSuccess;
		} catch (error) {
			handleException(error);
		}
	}
};
