
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import useConversation from "../zustand/useConversation"

const useGetAllUsers = () => {
    const [loading, setLoading] = useState(false)
    const { allUsers, setAllUsers } = useConversation()

    const getAllUsers = async () => {
        setLoading(true)
        try {
                const res = await fetch('/api/users', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            const data = await res.json()
            if (data.error) {
                throw new Error(data.error)
            }
            setAllUsers(data)
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
            getAllUsers()

    }, [])
    return { loading, allUsers,getAllUsers }
}
export default useGetAllUsers
