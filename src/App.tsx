import { useEffect } from "react";
import { Toaster } from "./components/ui/Toaster";
import MainLayout from "./layouts/MainLayout";
import {
  useAuthStateQuery,
  useGenAccessTokenMutation,
} from "./redux/features/auth/authApi";
import { IResponse } from "./types/globalTypes";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import {
  setLoading,
  setPlatform,
  setUserEmail,
} from "./redux/features/auth/authSlice";
import Loading from "./components/Loading";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase";

type IGenTokenRes = {
  data: IResponse;
};

function App() {
  const { platform, isLoading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setLoading(true));
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUserEmail(user.email));
        dispatch(setLoading(false));
        dispatch(setPlatform("firebase"));
      } else {
        dispatch(setLoading(false));
        dispatch(setPlatform("custom"));
      }
    });
  }, [dispatch]);

  const {
    data,
    isLoading: stateLoading,
    isError: stateError,
    refetch: stateRefetch,
  } = useAuthStateQuery(undefined, { skip: platform === "firebase" });

  const [
    getToken,
    { isLoading: genLoading, isSuccess: genSuccess, isError: genError },
  ] = useGenAccessTokenMutation();

  useEffect(() => {
    if (
      platform === "custom" &&
      stateError &&
      !genLoading &&
      !genSuccess &&
      !genError
    ) {
      getToken(undefined).then((data) => {
        const accessToken = (data as IGenTokenRes)?.data?.data?.accessToken;
        if (accessToken) {
          sessionStorage.setItem("accessToken", accessToken);
          stateRefetch();
        }
      });
    }
  }, [
    platform,
    stateLoading,
    stateError,
    genLoading,
    genSuccess,
    genError,
    getToken,
    stateRefetch,
  ]);

  useEffect(() => {
    if (platform === "custom" && !stateLoading && !stateError) {
      dispatch(setUserEmail(data?.data));
    }
  }, [platform, stateLoading, stateError, data?.data, dispatch]);

  return (
    <div>
      <Toaster />
      {isLoading || genLoading || stateLoading ? <Loading /> : <MainLayout />}
    </div>
  );
}

export default App;
