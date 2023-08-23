import Loading from "@/components/Loading";
import { auth } from "@/lib/firebase";

import { setLoading, setUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { onAuthStateChanged } from "firebase/auth";
import { ReactNode, useEffect } from "react";

type IProps = {
  children: ReactNode;
};

export default function UserProvider({ children }: IProps) {
  const { isLoading, user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  // firebase auth
  useEffect(() => {
    if (!user.email) {
      dispatch(setLoading(true));
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          dispatch(setUser(user.email));
          dispatch(setLoading(false));
        } else {
          dispatch(setLoading(false));
        }
      });
      return () => unsubscribe();
    }
  }, [dispatch, user]);

  if (isLoading) {
    return <Loading />;
  }
  return children;
}
