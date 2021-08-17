export function isNullOrEmpty(value?: string | null): boolean {
	return !value;
}

export function isNullOrWhitespace(value?: string | null): boolean {
	return !value || !value.trim();
}