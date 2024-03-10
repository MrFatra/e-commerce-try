export const fetcher = async (url: string, { arg }: { arg?: any }, method = 'GET') => {
    const body = arg ? JSON.stringify(arg) : undefined
    const res = await fetch(url, { method, body })
    return await res.json()
}
