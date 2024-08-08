import React from 'react'

interface ReturnProps<T> {
  data: T | undefined
  loading: boolean
  error: Error | undefined
  isError: boolean
}

export const useRequest = <T>(request: () => Promise<T>, runFetch: boolean = true): ReturnProps<T> => {
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
    if (runFetch) {
      fetchData()
    }
  }, [request, runFetch])
  return {
    data,
    loading,
    error,
    isError: error !== null,
  }
}
