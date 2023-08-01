import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  if (localStorage.getItem("Username") === null) {
    //no data saved in context
    return <Navigate to="/" />;
  } else {
    return children;
  }
};
