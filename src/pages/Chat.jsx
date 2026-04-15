import React, { useEffect } from 'react'
import MessageCard from '../components/chat/MessageCard'
import MessageList from '../components/chat/MessageList'
import { useParams } from 'react-router-dom';

const Chat = () => {

    const { targetUserId } = useParams();

  return (
    // h-screen
    <div className='flex items-center justify-center'>
        <div className='w-full max-w-6xl h-[90vh] bg-white rounded-2xl shadow-xl flex overflow-y-auto'>
             {/* 🔹 MOBILE VIEW */}
            <div className="w-full sm:hidden">
            {!targetUserId ? <MessageList /> : <MessageCard />}
            </div>

            {/* 🔹 DESKTOP VIEW */}
            <div className='hidden sm:flex w-full'>
            
            {/* Sidebar */}
            <div className='w-[30%] border-r border-gray-300 overflow-y-auto'>
                <MessageList />
            </div>

            {/* Chat */}
            <div className="w-[70%] bg-gray-50">
                {targetUserId ? (
                <MessageCard />
                ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                    Select a chat
                </div>
                )}
            </div>

            </div>
        </div>
    </div>
  )
}

export default Chat