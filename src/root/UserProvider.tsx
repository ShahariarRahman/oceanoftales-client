/* eslint-disable @typescript-eslint/no-explicit-any */
import Loading from "@/components/Loading";
import { auth } from "@/lib/firebase";
import {
  useAuthStateQuery,
  useGenAccessTokenMutation,
} from "@/redux/features/auth/authApi";
import {
  setLoading,
  setPlatform,
  setUserEmail,
} from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { IApiResponse } from "@/types/responseTypes";
import { onAuthStateChanged } from "firebase/auth";
import { ReactNode, useEffect } from "react";

type IProps = {
  children: ReactNode;
};

type IGenTokenRes = {
  data: IApiResponse<any>;
};

export default function UserProvider({ children }: IProps) {
  const { platform, isLoading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  // firebase auth
  useEffect(() => {
    dispatch(setLoading(true));
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUserEmail(user.email));
        dispatch(setPlatform("firebase"));
        dispatch(setLoading(false));
      } else {
        dispatch(setPlatform("custom"));
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

  // custom auth:
  const {
    data,
    isLoading: stateLoading,
    isError: stateError,
    refetch: stateRefetch,
  } = useAuthStateQuery(undefined, { skip: platform === "firebase" });

  const [getToken, { isError: genError }] = useGenAccessTokenMutation();

  useEffect(() => {
    if (platform === "custom" && stateError) {
      getToken(undefined).then((data) => {
        const accessToken = (data as IGenTokenRes)?.data?.data?.accessToken;
        if (accessToken) {
          sessionStorage.setItem("accessToken", accessToken);
          stateRefetch();
        }
      });
    }
  }, [platform, stateError, getToken, stateRefetch]);

  useEffect(() => {
    if (platform === "custom" && !stateLoading && !stateError) {
      dispatch(setUserEmail(data?.data));
      dispatch(setLoading(false));
    }
    if (platform === "custom" && !stateLoading && genError) {
      dispatch(setLoading(false));
    }
  }, [platform, stateLoading, stateError, data, genError, dispatch]);

  if (isLoading) {
    return <Loading />;
  }
  return children;
}
