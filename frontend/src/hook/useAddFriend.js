import { useState } from 'react'
import toast from 'react-hot-toast';
import useGetAllFriends from './useGetAllFriends';
import useGetAllUsers from './useGetAllUsers';

const useAddFriend = () => {
    const [loading, setLoading] = useState(false);
const {getAllFriends} =useGetAllFriends();
const {getAllUsers} =useGetAllUsers()

    const addFriend = async (friends) => {
        setLoading(true)
        try {
            const res = await fetch(`/api/friends/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({friends})
            })
            const data = await res.json()
            if (data.error) {
                throw new Error(data.error)
            }
            toast.success(data.message)
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
            getAllFriends()
            getAllUsers()

        }

    }
    return { addFriend, loading }
}

export default useAddFriend