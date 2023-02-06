import React, { useContext, useState, useEffect } from "react";
import { onAuth } from "../../firebase/auth";
import { USERS, onSnapDoc, getDocById } from "../../firebase/firestore";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState();

  useEffect(() => {
    const unsubscribe = onAuth(async (user) => {
      setCurrentUser((prev) => {
        if (prev && user && prev.uid !== user?.uid) {
          return prev;
        }
        return user;
      });
      if (user) {
        const userDoc = await getDocById(USERS, user.uid);
        setUserData((prev) => {
          if (prev) return prev;
          return userDoc.data();
        });
      } else {
        setUserData(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    let unsubscribe;
    if (currentUser) {
      unsubscribe = onSnapDoc(USERS, currentUser.uid, (doc) => {
        setUserData(doc.data());
      });
    }
    return unsubscribe;
  }, [currentUser]);

  const value = { currentUser, userData };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}
