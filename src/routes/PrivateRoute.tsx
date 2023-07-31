import { useAppSelector } from "@/redux/hooks";
import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

type IProps = {
  children: ReactNode;
};

export default function PrivateRoute({ children }: IProps) {
  const email = useAppSelector((state) => state.auth.user.email);

  const location = useLocation();

  if (!email) {
    return <Navigate to="/login" state={location} replace />;
  }

  return children;
}
