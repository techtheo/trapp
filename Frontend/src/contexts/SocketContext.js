import React, { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { useSelector } from "react-redux";
import { BASE_URL } from "../config";

const SocketContext = createContext();

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { user_id, isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isLoggedIn && user_id) {
      const serverUrl = BASE_URL.replace('/api/v1', '');
      const newSocket = io(serverUrl, {
        query: {
          user_id: user_id,
        },
      });

      setSocket(newSocket);

      // Listen for friend request events
      newSocket.on("friendRequestReceived", (data) => {
        console.log("Friend request received:", data);
        // You can dispatch actions here to update the UI
      });

      newSocket.on("friendRequestAccepted", (data) => {
        console.log("Friend request accepted:", data);
        // You can dispatch actions here to update the UI
      });

      newSocket.on("friendRequestRejected", (data) => {
        console.log("Friend request rejected:", data);
        // You can dispatch actions here to update the UI
      });

      return () => {
        newSocket.close();
      };
    }
  }, [isLoggedIn, user_id]);

  const value = {
    socket,
    onlineUsers,
    setOnlineUsers,
  };

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
};