export const fetcher = async (url: string, { arg }: { arg?: any } = {}, method = 'GET', headers?: HeadersInit | undefined) => {
    const body = arg ? JSON.stringify(arg) : undefined
    const res = await fetch(url, { method, body, headers })
    return await res.json()
}

export const multipartFetcher = async (url: string, { arg }: { arg?: any }, method: string = 'POST') => {
    const formData = new FormData()
    
    for (const key in arg) {
        if (Object.prototype.hasOwnProperty.call(arg, key)) {
            const value = arg[key]
            if (value instanceof File) {
                formData.append(key, value)
            } else {
                formData.append(key, value)
            }
        }
    }

    const response = await fetch(url, {
        method: method,
        body: formData,
    })

    if (!response.ok) {
        throw new Error('Failed to upload data')
    }

    return response.json()
}

