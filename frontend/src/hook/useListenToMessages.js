import { useEffect } from "react";
import { useSockeContext } from "../context/SockeContext";
import useConversation from "../zustand/useConversation";
import notificationSound from '../assets/sound/message.mp3';

const useListenToMessages = () => {
    const { socket } = useSockeContext();
    const { messages, setMessages, conversations, setConversations } = useConversation();

    useEffect(() => {
        socket?.on('newMessage', (newMessage, messagerId) => {
            newMessage.shouldShake = true;
            const sound = new Audio(notificationSound);
            sound.play();
            
            setMessages([...messages, newMessage]);

            // Reorder conversations
            const existingIndex = conversations.findIndex(convo => convo._id === messagerId);

            const updatedConversation = conversations[existingIndex];

            if (existingIndex > -1) {
                // Remove the conversation from its current position
                const updatedConversations = [
                    updatedConversation,
                    ...conversations.slice(0, existingIndex),
                    ...conversations.slice(existingIndex + 1)
                ];
              setConversations(updatedConversations);
            }
        });

        return () => socket?.off('newMessage'); // To stop listening for new messages event when it unmounts
    }, [socket, setMessages, messages, conversations, setConversations]);
};

export default useListenToMessages;
