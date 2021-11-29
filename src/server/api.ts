import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';


export interface ApiResponse {
	success: boolean;
	error?: string;
    message?: string;
}

export function handleException(e: unknown): ApiResponse {
	const error = e as AxiosError<ApiResponse|string>;
	if (error.response) {
        return typeof error.response.data === "string" ? {error: error.response.statusText, success: false}: {error: error.response.data.message, success: error.response.data.success};
    }

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

            this.updateApiHeaders(data.jwtToken, data.jwtExpirationDate);
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
        const s = expirationDate.toISOString();
        const s1 = new Date().toISOString();
        if (s < s1) return this.refresh();

		return;
	}
}

export const api = new Api();