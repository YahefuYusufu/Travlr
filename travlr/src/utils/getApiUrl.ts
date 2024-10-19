import { Platform } from "react-native"
import Constants from "expo-constants"

class ApiConfigService {
	private static instance: ApiConfigService
	private apiUrl: string

	private constructor() {
		this.apiUrl = this.getApiUrl()
	}

	public static getInstance(): ApiConfigService {
		if (!ApiConfigService.instance) {
			ApiConfigService.instance = new ApiConfigService()
		}
		return ApiConfigService.instance
	}

	private getApiUrl(): string {
		// Default to production URL
		let url = "https://your-production-api.com"

		if (__DEV__) {
			// Development environment
			if (Platform.OS === "android") {
				// Android emulator
				url = "http://10.0.2.2:5001/api"
			} else if (Platform.OS === "ios") {
				// iOS simulator
				url = "http://localhost:5001/api"
			} else {
				// Web or other platforms
				url = "http://localhost:5001/api"
			}

			// Override with Expo constants if available
			const expoApiUrl = Constants.expoConfig?.extra?.apiUrl
			if (expoApiUrl) {
				url = expoApiUrl
			}
		}

		console.log("Using API URL:", url)
		return url
	}

	public getBaseUrl(): string {
		return this.apiUrl
	}
}

export default ApiConfigService
