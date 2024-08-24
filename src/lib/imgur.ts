export const uploadImage = async (imageFile: File, title: string) => {
    try {

        const formData = new FormData()
        formData.append('image', imageFile)
        formData.append('type', 'file')
        formData.append('title', title)

        const clientId = process.env.IMGUR_CLIENT_ID

        if (!clientId) throw new Error('No IMGUR_CLIENT_ID key found!')
    
        console.log(formData)

        const response = await fetch('https://api.imgur.com/3/image', {
            method: 'POST',
            body: formData,
            headers: {
                Authorization: `Client-ID ${clientId}`,
            }
        })

        const data = await response.json()

        if (data.success) {
            return { data: data.data }
        } else {
            throw new Error(JSON.stringify(data))
        }
    } catch (error: any) {
        console.error(error.message)
        return error.message
    }
}

export const updateImage = async (imageFile: File, imageDeleteHash: string, title: string | null) => {
    const clientId = process.env.IMGUR_CLIENT_ID

    if (!clientId) throw new Error('No IMGUR_CLIENT_ID key found!')

    try {
        // delete image
        const deleteImage = await fetch(`https://api.imgur.com/3/image/${imageDeleteHash}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Client-ID ${clientId}`
            }
        })

        const deleted = await deleteImage.json()

        if (!deleted.success) throw new Error('Failed to delete image.')

        const uploadedData = await uploadImage(imageFile, title || '')
        return uploadedData

    } catch (err: any) {
        console.error(err.message)
        return err.message
    }
}