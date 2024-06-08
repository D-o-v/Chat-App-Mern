import { useEffect } from "react";
import { useSockeContext } from "../context/SockeContext";
import useConversation from "../zustand/useConversation";
import notificationSound from '../assets/sound/message.mp3';

const useListenToMessages = () => {
    const { socket } = useSockeContext();
    const { messages, setMessages, conversations, setConversations } = useConversation();

    const handleNewMessage = (newMessage, messagerId) => {
        newMessage.shouldShake = true;
        const sound = new Audio(notificationSound);
        sound.play();

        setMessages([...messages, newMessage]);
        reorderConversations(messagerId);
    };

    const handleNewConversation = (messagerId) => {
        reorderConversations(messagerId);
    };

    const reorderConversations = (messagerId) => {
        const existingIndex = conversations.findIndex(convo => convo._id === messagerId);

        if (existingIndex > -1) {
            const updatedConversation = conversations[existingIndex];
            const updatedConversations = [
                updatedConversation,
                ...conversations.slice(0, existingIndex),
                ...conversations.slice(existingIndex + 1)
            ];
            setConversations(updatedConversations);
        }
    };

    useEffect(() => {
        socket?.on('newMessage', handleNewMessage);
        socket?.on('newConversation', handleNewConversation);

        return () => {
            socket?.off('newMessage', handleNewMessage);
            socket?.off('newConversation', handleNewConversation);
        };
    }, [socket, setMessages, messages, conversations, setConversations]);

    return null;
};

export default useListenToMessages;
