export const convertUriToFile = async (uri: string): Promise<File> => {
	const response = await fetch(uri)
	const blob = await response.blob()
	const fileName = uri.split("/").pop() || "photo.jpg"
	const lastModified = new Date().getTime() // Or another way to get the last modified time

	return new File([blob], fileName, { type: blob.type, lastModified })
}

// const convertUriToFile = async (imageUri: string): Promise<File> => {
//     const response = await fetch(imageUri);
//     const blob = await response.blob();

//     // Optionally set a file name and type for the File object
//     const fileName = imageUri.split('/').pop() || 'image.jpg'; // Default to 'image.jpg' if no name found
//     const fileType = blob.type || 'image/jpeg'; // Default to 'image/jpeg'

//     return new File([blob], fileName, { type: fileType });
// };

export const convertUriToBlob = async (uri: string): Promise<Blob> => {
	const response = await fetch(uri)
	const blob = await response.blob()
	return blob
}
