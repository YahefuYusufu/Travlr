import React, { createContext, useContext, useState, ReactNode } from "react"
import { UserProfile, UserContextProps } from "../types/types"

const UserContext = createContext<UserContextProps>({
	userId: null,
	userData: null,
	setUserId: () => {},
	setUserData: () => {},
})

// const UserContext = createContext<UserContextProps | undefined>(undefined)

export const UserProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [userId, setUserId] = useState<string | null>(null)
	const [userData, setUserData] = useState<UserProfile | null>(null)

	return (
		<UserContext.Provider value={{ userId, userData, setUserId, setUserData }}>
			{children}
		</UserContext.Provider>
	)
}

export const useUser = () => {
	const context = useContext(UserContext)
	if (!context) {
		throw new Error("useUser must be used within a UserProvider")
	}
	return context
}
