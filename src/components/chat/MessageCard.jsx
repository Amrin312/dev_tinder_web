import React, { useState, useRef, useEffect } from 'react';
import defaultImg from '../../assets/dummy_image.png';
import { SendHorizonal } from 'lucide-react';
import { createSocketConnection } from '../../utils/socket';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../../utils/constants';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';


const MessageCard = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [targetUser, setTargetUser] = useState([]);

  const navigate = useNavigate();
  const { targetUserId } = useParams();

  const user = useSelector(store => store.user);

  const userId = user?._id;
  const firstName = user?.firstName;

  const chatEndRef = useRef(null);

  const handleSend = () => {
    if (!message.trim()) return;

    const socket = createSocketConnection();

    socket.emit('sendMessage', { firstName, userId, targetUserId, message });
    setMessage("");
  };

  const fetchChats = async () => {

    const chat = await axios.get(`${BASE_URL}/get_chat/${targetUserId}`, {
      withCredentials: true
    });
    // console.log(chat);
    
    const chatMsgs = chat?.data?.messages.map(msg => {
      return {
        message: msg?.message,
        senderId: msg?.senderId?._id,
        id: msg?._id
      }
    });

    const targetUserData = chat?.data?.participants.find(data => data._id == targetUserId);

    console.log(targetUserData);

    setTargetUser(targetUserData);
    
    setMessages(chatMsgs);
  }

  useEffect(() => {

    fetchChats();

  }, [targetUserId])

  const handleText = (e) => {
    setMessage(e.target.value)
  }

  // Auto scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

    useEffect(() =>{

        if(!userId){
          return
        }

        const socket = createSocketConnection();

        socket.emit('joinChat', { userId, targetUserId });

        socket.on("messageReceived", ({ firstName, message, senderId }) => {

          setMessages(prev => [...prev, { senderId, message, firstName}]);

        })
        return () => {
            socket.disconnect();
        };

    }, [userId, targetUserId]);

  if (!targetUserId) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500 border border-gray-300 rounded-r-2xl rounded-b-2xl">
        Select a chat to start messaging
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full w-full bg-white rounded-r-2xl rounded-b-2xl shadow-lg overflow-hidden border border-gray-300">

      {/* 🔹 HEADER */}
      <div className="flex items-center gap-3 p-4 border-b border-gray-300 shadow">
        <button 
          className="sm:hidden"
          onClick={() => navigate('/chat')}
        >
          <ArrowLeft size={20} />
        </button>

        <img
          src={defaultImg}
          alt="user"
          className="h-10 w-10 rounded-full border-2 border-white"
        />
        <div>
          <p className="font-semibold text-sm">{targetUser?.firstName} {targetUser?.lastName}</p>
          {/* <p className="text-xs opacity-80">Online</p> */}
        </div>
      </div>

      {/* 🔹 BODY */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-100">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              user._id == msg?.senderId ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-2 text-sm max-w-[75%] shadow-sm ${
                user._id == msg?.senderId
                  ? "bg-blue-500 text-white rounded-2xl rounded-br-sm"
                  : "bg-white text-gray-800 rounded-2xl rounded-bl-sm"
              }`}
            >
              {msg.message}
            </div>
          </div>
        ))}
        <div ref={chatEndRef}></div>
      </div>

      {/* 🔹 FOOTER */}
      <div className="flex items-center gap-2 p-3 bg-white border-t border-gray-300">
        <input
          type="text"
          value={message}
          onChange={handleText}
          placeholder="Type a message..."
          className="flex-1 bg-gray-100 px-4 py-2 rounded outline-none text-sm focus:ring-2 focus:ring-blue-400"
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />

        <button
          onClick={handleSend}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm transition"
        >
          <SendHorizonal /> 
        </button>
      </div>

    </div>
  );
};

export default MessageCard;