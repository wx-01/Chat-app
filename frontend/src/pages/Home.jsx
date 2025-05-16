import React from 'react'
import Sidebar from '../components/Sidebar'
import ChatContainer from '../components/ChatContainer'
import NoChatSelected from '../components/NoChatSelected'
import { useChatStore } from '../store/useChatStore'

const Home = () => {
  const {selectedUser}=useChatStore();
  return (
    <div className='h-screen bg-base-200'>
      <div className='flex items-center justify-center  pt-20 px-4'>
        <div className='bg-base-100 rounded-lg border-3 border-primary shadow-cl w-full mx-w-6xl h-[calc(100vh-8rem)]'>
          <div className='flex h-full rounded-lg overfow-hidden'>
            <Sidebar />

            {!selectedUser? <NoChatSelected/>:<ChatContainer/>}
          </div>

        </div>

      </div>
    </div>
  )
}

export default Home