import React from "react";
import {useDispatch, useSelector} from "react-redux"
import {setSelectedUser} from "../Redux/userSlice"

const OtherUser = ({ user }) => {
  const dispatch = useDispatch();
  const {selectedUser, onlineUsers} = useSelector(store=>store.user)
  // console.log("onlineUsers",onlineUsers);
  const isOnline = onlineUsers.includes(user._id)
  
  const selectedUserHandler = (user) => {
    dispatch(setSelectedUser(user))
  };
  return (
    <>
      <div
        onClick={() => selectedUserHandler(user)}
        className={` ${selectedUser?._id===user?._id ? "bg-zinc-200 , text-black" :''} flex gap-2 items-center hover:bg-zinc-200 hover:text-black rounded-sm p-2 cursor-pointer`}
      >
        <div className={`avatar ${isOnline ? 'online' : ''}`}>
          <div className="w-10 rounded-full">
            <img src={user?.profilePhoto} alt="" user-profile />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex justify-between items-center gap-2 flex-1">
            <p>{user?.fullname}</p>
          </div>
        </div>
      </div>
      <div className="divider my-0 py-0 h-1"></div>
    </>
  );
};

export default OtherUser;