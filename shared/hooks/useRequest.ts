import React from 'react'

interface ReturnProps<T> {
    data: T | undefined
    loading: boolean
    error: Error | undefined
    isError: boolean
}

export const useRequest = <T>(request: () => Promise<T>): ReturnProps<T> => {
    const [data, setData] = React.useState<T | undefined>(undefined)
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState<Error | undefined>(undefined)

    React.useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true)
                const data = await request()
                setData(data)
            } catch (e: any) {
                setError(e)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [request])
    return {
        data,
        loading,
        error,
        isError: error !== null,
    }
}
