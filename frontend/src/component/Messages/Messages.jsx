import Message from './Message';
import useGetMessages from '../../hook/useGetMessages';
import MesssageSkeleton from '../skeleton/MesssageSkeleton';
import { useEffect, useRef } from 'react';
import useListenToMessages from '../../hook/useListenToMessages';

const Messages = () => {
    const { loading, messages } = useGetMessages();
    useListenToMessages()
    const lastMessageRef = useRef()

    const loadingSkeletons = loading && [...Array(3)].map((_, idx) => <MesssageSkeleton key={idx} />);

    const messageList = !loading && messages.length > 0 && messages.map((item) =>
        <div key={item.id} ref={lastMessageRef}>
            <Message message={item} />
        </div>
    );
    const noMessages = !loading && messages.length === 0 && (
        <div className=' text-white text-center my-[50%] flex justify-center'>
            Type a message to start conversation.
        </div>
    );

    useEffect(() => {
        setTimeout(() => {
            lastMessageRef.current.scrollIntoView({ behavior: 'smooth' })
        },100)
    }, [messages])
    
    return (
        <div className='px-4 flex-1 overflow-auto'>
            {loadingSkeletons}
            {messageList}
            {noMessages}
        </div>
    );
};

export default Messages;
