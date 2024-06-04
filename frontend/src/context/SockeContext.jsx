import { createContext, useContext, useEffect, useState } from "react"
import { useAuthContext } from "./AuthContext"
import io from 'socket.io-client'

const SockeContext = createContext()

export const useSockeContext = () => {
    return useContext(SockeContext)
  } 

export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState([])
    const { authUser } = useAuthContext()

    useEffect(() => {
        if (authUser) {
            // const socket = io('http://localhost:5000', {
            const socket = io('https://chat-app-mern-sevk.onrender.com', {
                query: {
                    userId: authUser._id
                }
            })
            setSocket(socket)

            //socket.on() is used to listen for event,can be used both on client and server side
            socket.on('getOnlineusers', (users) => {
                setOnlineUsers(users)
            })
            return () => socket.close()
        } else {
            if (socket) {
                socket.close()
                setSocket(null)
            }
        }
    }, [authUser])
    return (
        <SockeContext.Provider value={{ socket, onlineUsers }}>
            {children}
        </SockeContext.Provider>
    )
}

export default SockeContext