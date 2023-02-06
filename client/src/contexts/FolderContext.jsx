import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { addWithId, onSnap, FOLDERS } from "../firebase/firestore";
import { useAuth } from "../auth";

const FolderContext = createContext();

export function useFolders() {
  return useContext(FolderContext);
}

export function FoldersProvider({ children }) {
  const { currentUser } = useAuth();
  const [folders, setFolders] = useState([]);

  const create = useCallback(
    async (name) => {
      await addWithId(FOLDERS, name, {
        name,
        userId: currentUser.uid,
      });
    },
    [currentUser],
  );

  useEffect(() => {
    const unsub = onSnap(FOLDERS, (querySnapshot) => {
      const folders = [];
      querySnapshot.forEach((doc) => {
        folders.push({ ...doc.data(), id: doc.id });
      });
      setFolders(folders);
    });
    return unsub;
  }, []);

  const value = { folders, create };

  return <FolderContext.Provider value={value}>{children}</FolderContext.Provider>;
}
