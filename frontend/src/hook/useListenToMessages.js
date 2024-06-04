import { useEffect } from "react"
import { useSockeContext } from "../context/SockeContext"
import useConversation from "../zustand/useConversation"
import notificationSound from '../assets/sound/message.mp3'

const useListenToMessages = () => {
  const {socket} = useSockeContext()
  const {messages,setMessages} =useConversation()
  useEffect(()=>{
    socket?.on('newMessage',(newMessage)=>{
        newMessage.shouldShake = true
        const sound = new Audio(notificationSound)
        sound.play()
      setMessages([...messages,newMessage])
    })
    return ()=>socket?.off('newMessage') //to stop licstening for new messages event when it unmounts
  },[socket,setMessages,messages])
}
export default useListenToMessages