import {create} from 'zustand'

const useConversation = create((set) => ({
    allUsers:[],
    setAllUsers:(allUsers)=>set({allUsers}),
    allFriends:[],
    setAllFriends:(allFriends)=>set({allFriends}),
    conversations:[],
    setConversations:(conversations)=>set({conversations}),
    selectedConversation:null,
    setSelectedConversation:(selectedConversation)=>set({selectedConversation}),
    messages:[],
    setMessages:(messages)=>set({messages}),
}))
export default useConversation