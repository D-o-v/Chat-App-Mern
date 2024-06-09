
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import useConversation from "../zustand/useConversation"

const useGetAllFriends = () => {
    const [loading, setLoading] = useState(false)
    const { allFriends, setAllFriends } = useConversation()

    const getAllFriends = async () => {
        setLoading(true)
        try {
                const res = await fetch('/api/friends', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            const data = await res.json()
            if (data.error) {
                throw new Error(data.error)
            }
            setAllFriends(data)
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
            getAllFriends()

    }, [])
    return { loading, allFriends ,getAllFriends}
}
export default useGetAllFriends
