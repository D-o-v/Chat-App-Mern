import React from 'react'
import Conversation from './Conversation'
import useGetCoversation from '../../hook/useGetCoversation'
import { getRandomEmoji } from '../../utils/getRandomEmoji'
import ConversationsSkeleton from '../skeleton/ConversationSkeleton'

const Conversations = () => {
  const { loading, conversations, allFriends } = useGetCoversation()

  return (
    <div className='py-3 flex flex-col overflow-auto'>
      {!loading && conversations.map((conversation, idx) =>
        <Conversation
          key={conversation._id}
          conversation={conversation}
          emoji={getRandomEmoji()}
          lastIndex={idx === conversations.length - 1}
        />
      )}

      {loading && [...Array(3)].map((_, idx) => <ConversationsSkeleton key={idx} />)}

      {allFriends?.length < 0 && <div className='px-4 text-center font-medium'>
        You currently do not have any friends, kindly add a friend to start chatting
      </div>}

      {allFriends?.length > 0 && conversations?.length < 0 && <div className='px-4 text-center font-medium'>
        You have not chatted anyone here, kindly search a friend to start chatting
      </div>}
    </div>
  )
}
export default Conversations