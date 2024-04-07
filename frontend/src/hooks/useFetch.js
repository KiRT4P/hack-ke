import { useEffect, useState } from 'react'

const DEFAULT_OPTIONS = {
    headers: { "Content-Type": "application/json" },
}

/*
@params url: string
@params query: string
@returns { data, isPending, error }
*/
export default function useFetch(url, query = null, options = DEFAULT_OPTIONS) {
    const [data, setData] = useState(null)
    const [isPending, setIsPending] = useState(true)
    const [error, setError] = useState(null)


    useEffect(() => {
        const fetchData = () => {
            let stringQuerry = ''
            if (query !== null) {
                stringQuerry = "?" + new URLSearchParams(query).toString()
            }
            setIsPending(true)
            fetch(process.env.REACT_APP_TARGET + url + stringQuerry, { ...options })
                .then(res => {
                    if (!res.ok) {
                        console.log(res);
                        throw Error('Could not fetch the data for that resource')
                    }
                    return res.json()

                }).then(data => {
                    setData(data)
                    console.log({ "data": data, "url": url });
                    setError(null)
                    setIsPending(false)
                }).catch(err => {
                    // console.log(err);
                    setError(err.message)
                    setIsPending(false)
                })
        }

        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return { data, isPending, error, setData }
}