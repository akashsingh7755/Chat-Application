import React, { useEffect, useRef } from 'react'
import {useSelector} from "react-redux";

const SingleMessage = ({message}) => {
    const scroll = useRef();
    const {authUser,selectedUser} = useSelector(store=>store.user);
    // console.log(authUser?.id);
    
    useEffect(()=>{
        scroll.current?.scrollIntoView({behavior:"smooth"});
    },[message]);
    
    return (
        
        <div ref={scroll} className={`chat ${message?.senderId === authUser?.id ? 'chat-end' : 'chat-start'}`}>
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img alt="Tailwind CSS chat bubble component" src={message?.senderId === authUser?.id ? authUser?.profilePhoto  : selectedUser?.profilePhoto } />
                </div>
            </div>
            <div className="chat-header">
                <time className="text-xs opacity-50 text-white">12:45</time>
            </div>
            <div className={`chat-bubble ${message?.senderId !== authUser?.id ? 'bg-gray-200 text-black' : ''} `}>{message?.message}</div>
        </div>
    )
}

export default SingleMessage