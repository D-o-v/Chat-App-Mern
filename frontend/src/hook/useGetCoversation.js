import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import useConversation from "../zustand/useConversation"

const useGetCoversation = () => {
    const [loading, setLoading] = useState(false)
    const { conversations, setConversations } = useConversation()

    useEffect(() => {
        
        if (!conversations.length) {
            const getConversations = async () => {
                setLoading(true)
                try {
                    const res = await fetch('/api/friends/recent-conversations', {
                        // const res = await fetch('/api/friends', {
                        // const res = await fetch('/api/users', {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    })
                    const data = await res.json()
                    if (data.error) {
                        throw new Error(data.error)
                    }
                    setConversations(data)
                } catch (error) {
                    toast.error(error.message)
                } finally {
                    setLoading(false)
                }
            }
            getConversations()
        }

    }, [])
    return { loading, conversations }
}
export default useGetCoversation



// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import useConversation from "../zustand/useConversation";

// const useGetConversation = () => {
//     const [loading, setLoading] = useState(false);
//     const { conversations, setConversations } = useConversation();

//     useEffect(() => {
//         const getConversations = async () => {
//             setLoading(true);
//             try {
//                 const res = await fetch('/api/friends/recent-conversations', {
//                     method: 'GET',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     }
//                 });
//                 const data = await res.json();
//                 if (data.error) {
//                     throw new Error(data.error);
//                 }
//                 setConversations(data);
//             } catch (error) {
//                 toast.error(error.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         // if (!conversations.length)
//             getConversations();
//     }, []);

//     return { loading, conversations };
// };

// export default useGetConversation;
