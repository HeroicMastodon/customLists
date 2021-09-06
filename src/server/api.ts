import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';


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

interface AxiosMethod {
	<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig | undefined):  Promise<R>
}

class Api {
	public client: AxiosInstance;
	private baseUrl = "/api";

	constructor() {
		const token = window.localStorage.getItem("token");
		this.client = axios.create({
			baseURL: this.baseUrl,
			headers: {
				Authorization: `Bearer ${token}`
			}
		});
	}

	get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>{
		return this.client.get<T>(url, config);
	}

	post<T>(url: string, payload: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
		return this.client.post(url, payload, config);
	}

	patch<T>(url: string, payload: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
		return this.client.patch<T>(url, payload, config);
	}

	delete<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
		return this.client.delete(url, config);
	}

	updateApiHeaders(token: string): void {
		window.localStorage.setItem("token", token);

		this.client = axios.create({
			baseURL: this.baseUrl,
			headers: {
				Authorization: `Bearer ${token}`
			}
		});
	}
}

export const api = new Api();