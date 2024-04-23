import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { authContext } from "../context/AuthContext";
type Props = {
  children: React.ReactNode;
};

const ProtectedRoutes = ({ children }: Props) => {
  const { token } = useContext(authContext);

  const accessibleRoute =
    token !== null ? children : <Navigate to="/login" replace={true} />;
  return accessibleRoute;
};

export default ProtectedRoutes;
