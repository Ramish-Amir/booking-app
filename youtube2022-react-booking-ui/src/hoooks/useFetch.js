import axios from "axios"
import { useEffect, useState } from "react"


const useFetch = async (url) => {
    const ROOT_URL = 'http://localhost:8000/api'
    const [data, setData] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                 const res = await axios.get(`${ROOT_URL}${url}`)
                 setData(res?.data)

            } catch (err) {
                setError(err)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [url])


    const reFetch = async () => {
        setLoading(true)
        try {
             const res = await axios.get(url)
             setData(res?.data)

        } catch (err) {
            setError(err)
        } finally {
            setLoading(false)
        }
    }

    return {data, loading, error, reFetch}

}

export default useFetch