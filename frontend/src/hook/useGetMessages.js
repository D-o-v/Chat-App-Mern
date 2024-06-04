import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import useConversation from '../zustand/useConversation'

const useGetMessages = () => {
    const { messages, setMessages, selectedConversation } = useConversation()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const getMessages = async () => {
        setLoading(true)
            try {
                const res = await fetch(`/api/messages/${selectedConversation._id}`, {
                    method: 'GET',
                    headers: { 'ContentType': 'application/json' }
                })
                const data = await res.json()
                if (data.message) {
                    throw new Error(data.message)
                }
                setMessages(data)
            } catch (error) {
                toast.error(error.message)
            } finally {
                setLoading(false)
            }
        }
        if (selectedConversation?._id) {
            getMessages()
        }
    }, [selectedConversation?._id, setMessages])
    return { loading, messages }
}

export default useGetMessages