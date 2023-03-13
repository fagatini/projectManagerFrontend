import { Navigate } from "react-router-dom";

export const RequireAuth = ({ children }) => {
  const logged = localStorage.getItem("logged") ? true : false;

  if (!logged) {
    return <Navigate to="/" replace={true} />;
  }

  return children;
};
