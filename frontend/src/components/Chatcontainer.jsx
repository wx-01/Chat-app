import React from 'react'
import { useChatStore } from '../store/useChatStore'
import { useEffect } from 'react';
import ChatHeader from './ChatHeader';
import MessageInput from './MessageInput';
import MessageSkeleton from './skeletons/MessageSkeleton';
const Chatcontainer = () => {

  const{messages,getMessages,isMessagesLoading,selectedUser}=useChatStore();

  useEffect(()=>{
    getMessages(selectedUser._id)
  },[selectedUser._id , getMessages])

   if(isMessagesLoading){return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }
   return (
    <div className='flex-1 flex-col overflow-auto'>
      <ChatHeader />
      <p>mesages..</p>
      <MessageInput />
      </div>
  )
}

export default Chatcontainer