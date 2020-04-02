import React, { useEffect, useState } from "react";
// import { set } from "date-fns";
export const CurrentUser = React.createContext(null);
export default function CurrentUserContext({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    fetch("/api/me/profile")
      .then(res => {
        return res.json();
      })
      .then(data => {
        return setCurrentUser(data), setStatus("idle");
      });
  }, []);
  return (
    <CurrentUser.Provider
      value={{
        currentUser,
        status
      }}
    >
      {children}
    </CurrentUser.Provider>
  );
}
