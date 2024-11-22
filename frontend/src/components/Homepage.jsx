import React from "react";
import Sidebar from "./Sidebar";
import MessageContainer from "./MessageContainer";
import Login from "./Login";
import {useSelector} from "react-redux"

const Homepage = () => {

  const { authUser } = useSelector((store) => store.user);
  if(authUser){
    return (
      <div className="flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <Sidebar />
        <MessageContainer />
      </div>
    );
  }
  else{
    return (
    <Login />
    )
  }
};

export default Homepage;
