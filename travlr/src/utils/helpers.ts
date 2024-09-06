export const convertUriToFile = async (uri: string) => {
	const response = await fetch(uri)
	const blob = await response.blob()
	const fileName = uri.split("/").pop() || "photo.jpg"
	const lastModified = new Date().getTime() // Or another way to get the last modified time

	return new File([blob], fileName, { type: blob.type, lastModified })
}

export const convertUriToBlob = async (uri: string): Promise<Blob> => {
	const response = await fetch(uri)
	const blob = await response.blob()
	return blob
}
