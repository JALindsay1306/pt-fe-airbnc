import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const UserContext = createContext();

export const UserProvider = ({ children, initialUserID }) => {
  // Ensure initialUserID is valid
  const [user, setUser] = useState({
    userID: initialUserID || null,
    fullName: "",
  });

  useEffect(() => {
    if (!user.userID) return; // Stop if userID is null

    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `https://jl-air-bnc.onrender.com/api/users/${user.userID}`
        );
        const userData = response.data.user;
        setUser((prevUser) => ({
          ...prevUser, // Keep existing userID
          fullName: `${userData.first_name} ${userData.surname}`,
        }));
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [user.userID]); // Only re-run when userID changes

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
