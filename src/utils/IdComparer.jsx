import { Navigate, useParams } from "react-router-dom";

export const IdComparer = ({ children }) => {
  const urlId = useParams().id;
  const loggedId = localStorage.getItem("logged");

  if (loggedId !== urlId) {
    localStorage.removeItem("logged");
    localStorage.removeItem("accountType");
    return <Navigate to="/" replace={true} />;
  }

  return children;
};
