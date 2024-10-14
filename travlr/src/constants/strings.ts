export const ROUTES = {
	WELCOME: "Welcome",
	HOME: "Home",
	DESTINATION: "Destination",
	NEWTRIP: "NewTrip",
	TRIPDETAILS: "TripDetails",
	ALLIMAGES: "AllImages",
} as const
export type Routes = (typeof ROUTES)[keyof typeof ROUTES]

export const TEXTS = {
	GALLERY: "Gallery",
	SEE_ALL: "See All",
	// Add more text constants here as needed
} as const

export type TextKeys = keyof typeof TEXTS
