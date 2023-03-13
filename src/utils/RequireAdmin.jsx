import { Navigate } from "react-router-dom";

export const RequireAdmin = ({ children }) => {
  const accountType = localStorage.getItem("accountType");

  if (accountType !== "admin") {
    return <Navigate to="/" replace={true} />;
  }

  return children;
};
