import axios, { AxiosError } from 'axios';

export const api = axios.create({
	baseURL: "/api",
});

export interface ApiResponse {
	success: boolean;
	error?: string;
}

export function handleException(e: AxiosError<ApiResponse>): ApiResponse {
	if (e.response && e.response.data) return e.response.data;

	return {
		success: false
	}
}