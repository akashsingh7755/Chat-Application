import React, { useEffect, useState } from "react";
import { HiSearch } from "react-icons/hi";
import OtherUsers from "../components/OtherUsers.jsx";
import axios, { all } from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setAuthUser, setOtherUsers } from "../Redux/userSlice.js";

const Sidebar = () => {
  const [search, setSearch] = useState("");
  const { otherUsers, allUsers } = useSelector((store) => store.user);
  const cache = otherUsers;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/v1/user/logout`);
      navigate("/login");
      toast.success(res.data.message);
      dispatch(setAuthUser(null));
    } catch (error) {
      console.log(error);
    }
  };

  const findChat = (conversationUser) => {
    if (conversationUser) {
      dispatch(setOtherUsers([conversationUser]));
    } else {
      toast.error("User not found!");
    }
    setSearch("");
    setTimeout(() => {
      dispatch(setOtherUsers(allUsers));
    }, 5000);
    // console.log("otherUsers:",otherUsers);
    // console.log("allUsers:",allUsers);
    // console.log("cache: ",cache);
  };

  const searchSubmitHandler = (e) => {
    e.preventDefault();

    // Find the user based on the search input
    const conversationUser = otherUsers?.find((user) =>
      user.fullname.toLowerCase().includes(search.toLowerCase())
    );

    findChat(conversationUser);
  };

  const resetUserList = () => {
    // console.log("new cache: ", cache);
    // console.log("new otherUsers: ", otherUsers);
    // console.log("new allUsers: ", allUsers);

    dispatch(setOtherUsers(allUsers));
  };

  return (
    <div className="border-r border-slate-500 p-4 flex flex-col">
      <form onSubmit={searchSubmitHandler} className="flex items-center gap-1">
        <input
          className="input input-bordered rounded-md"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search..."
        />
        <button type="submit" className="btn bg-zinc-700">
          <HiSearch size="20px" color="white" />
        </button>
      </form>
      <div className="divider px-3"></div>

      <OtherUsers resetUserList={resetUserList} />

      <div className="mt-2">
        <button onClick={logoutHandler} className="btn btn-sm">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
