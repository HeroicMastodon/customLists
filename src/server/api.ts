import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';


export interface ApiResponse {
	success: boolean;
	error?: string;
}

export function handleException(e: unknown): ApiResponse {
	const error = e as AxiosError<ApiResponse>;
	if (error.response && error.response.data) return error.response.data;

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
			},
		});
	}

	async get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>{
        const refreshError = await this.refreshIfNeeded();
        if (refreshError) return refreshError;
		return this.client.get<T>(url, config);
	}

	async post<T>(url: string, payload: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        const refreshError = await this.refreshIfNeeded();
        if (refreshError) return refreshError;
		return this.client.post(url, payload, config);
	}

	async patch<T>(url: string, payload: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        const refreshError = await this.refreshIfNeeded();
        if (refreshError) return refreshError;
		return this.client.patch<T>(url, payload, config);
	}

	async delete<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        const refreshError = await this.refreshIfNeeded();
        if (refreshError) return refreshError;
		return this.client.delete(url, config);
	}

	updateApiHeaders(token: string, expiration: string): void {
		window.localStorage.setItem("token", token);
		window.localStorage.setItem("expires", expiration);

		this.client = axios.create({
			baseURL: this.baseUrl,
			headers: {
				Authorization: `Bearer ${token}`
			}
		});
	}

    getAuthToken() {
        return window.localStorage.getItem("token");
    }

	async refresh() {
		const token = window.localStorage.getItem("token");
		try {
			const result = await this.client.put('/user', {
				jwtToken: token,
			});

			if (result.status != 200) return result;

			const data = result.data;

			window.localStorage.setItem("token", data.jwtToken);
			window.localStorage.setItem("expires", data.jwtExpirationDate);
			return;
		} catch (e) {
            const aE = e as AxiosError;
			console.log({aE});
			return aE.response;
		}
	}
	
	async refreshIfNeeded() {
		const token = window.localStorage.getItem("token");
		const expires = window.localStorage.getItem("expires");

		if (! expires) return;
		if (! token) return;

		const expirationDate = new Date(expires);
		if (expirationDate.toISOString() < new Date().toISOString()) return this.refresh();

		return;
	}
}

export const api = new Api();