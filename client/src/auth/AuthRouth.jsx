import { Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

export function AuthRouth({ component: Component, adminRequired }) {
  const { currentUser, userData } = useAuth();

  if (adminRequired && !userData.isAdmin) return <Navigate to={{ pathname: "/auth/login" }} />;
  if (!currentUser || !userData?.active) return <Navigate to={{ pathname: "/auth/login" }} />;
  return <Component />;
}

export default AuthRouth;
