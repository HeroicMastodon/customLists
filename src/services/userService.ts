import { reactive, readonly } from "vue";

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
	username: ""
});


export const useUsers = (): User => readonly(user);

export const userService = {
	login: async (username: string, password: string): Promise<LoginResponse> => {
		user.username = username;
		return {
			success: true
		}
	},
	register: async (username: string, password: string): Promise<LoginResponse> => {
		return {
			success: false,
			error: "User already exists"
		}
	}
};