import React from 'react'
import Conversation from './Conversation'
import useGetCoversation from '../../hook/useGetCoversation'
import { getRandomEmoji } from '../../utils/getRandomEmoji'
import ConversationsSkeleton from '../skeleton/ConversationSkeleton'

const Conversations = () => {
  const { loading, conversations } = useGetCoversation()

  return (
    <div className='py-3 flex flex-col overflow-auto'>
      {conversations.map((conversation, idx) =>
        <Conversation
          key={conversation._id}
          conversation={conversation}
          emoji={getRandomEmoji()}
          lastIndex={idx === conversations.length - 1}
        />
      )}

      {loading && [...Array(3)].map((_, idx) => <ConversationsSkeleton key={idx} />)}
    </div>
  )
}

export default Conversations