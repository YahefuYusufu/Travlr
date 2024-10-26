import { Trip } from "../hooks/useTrips"

/**
 * Extracts the date (YYYY-MM-DD) from a Date object.
 * @param {Date} dateObj - The Date object to extract the date from.
 * @returns {string | null} - The date string in the format YYYY-MM-DD, or null if input is invalid.
 */
export const formatDate = (dateObj: Date | null): string | null => {
	if (!dateObj) return null
	return dateObj.toISOString().split("T")[0]
}

/**
 * Extracts the time (HH:MM:SS) from a Date object.
 * @param {Date} timeObj - The Date object to extract the time from.
 * @returns {string | null} - The time string in the format HH:MM:SS, or null if input is invalid.
 */
export const formatTime = (timeObj: Date | null): string | null => {
	if (!timeObj) return null
	return timeObj.toTimeString().split(" ")[0] // Returns time in HH:MM:SS format
}

/**
 * Adjusts a Date object to UTC.
 * @param {Date} date - The Date object to adjust.
 * @returns {Date} - The adjusted Date object.
 */
export const adjustDateToUTC = (date: Date): Date => {
	return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
}

/**
 * Formats a date for use in a date picker.
 * @param {Date | null} date - The Date object to format, or null.
 * @returns {Date} - The formatted Date object.
 */
export const formatDateForPicker = (date: Date | null): Date => {
	if (!date) return new Date()
	return adjustDateToUTC(date)
}

/**
 * Formats a date for display.
 * @param {Date | null} date - The Date object to format, or null.
 * @returns {string} - The formatted date string.
 */
export const formatDateForDisplay = (date: Date | null): string => {
	return date ? date.toLocaleDateString() : "Select date"
}

/**
 * Parses a time string into a Date object.
 * @param {string | null} timeString - The time string to parse.
 * @returns {Date | null} - The parsed Date object, or null if input is invalid.
 */
export const parseTime = (timeString: string | null): Date | null => {
	if (!timeString) return null
	return new Date(`1970-01-01T${timeString}`)
}

/**
 * Formats a time for display.
 * @param {Date | null} time - The Date object to format, or null.
 * @returns {string} - The formatted time string.
 */
export const formatTimeForDisplay = (time: Date | null): string => {
	if (!time) return "Select time"
	// Format time as HH:mm (24-hour format)
	return time.toISOString().substr(11, 5)
}

export const sortTripsByDate = (trips: Trip[]): Trip[] => {
	return [...trips].sort((a, b) => {
		const dateA = new Date(a.createdAt).getTime()
		const dateB = new Date(b.createdAt).getTime()
		return dateB - dateA // This ensures newest first
	})
}
