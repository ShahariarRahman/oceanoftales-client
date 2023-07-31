import { useEffect } from "react";
import { Toaster } from "./components/ui/Toaster";
import MainLayout from "./layouts/MainLayout";
import {
  useAuthStateQuery,
  useGenAccessTokenMutation,
} from "./redux/features/auth/authApi";
import { IResponse } from "./types/globalTypes";
import { useAppDispatch } from "./redux/hooks";
import { setUserEmail } from "./redux/features/auth/authSlice";
import Loading from "./components/Loading";

type IGenTokenRes = {
  data: IResponse;
};

function App() {
  const dispatch = useAppDispatch();

  const {
    data,
    isLoading: stateLoading,
    isError: stateError,
    refetch: stateRefetch,
  } = useAuthStateQuery(undefined);

  const [
    getToken,
    { isLoading: genLoading, isSuccess: genSuccess, isError: genError },
  ] = useGenAccessTokenMutation();

  useEffect(() => {
    if (stateError && !genLoading && !genSuccess && !genError) {
      getToken(undefined).then((data) => {
        const accessToken = (data as IGenTokenRes)?.data?.data?.accessToken;
        if (accessToken) {
          sessionStorage.setItem("accessToken", accessToken);
          stateRefetch();
        }
      });
    }
  }, [
    stateLoading,
    stateError,
    genLoading,
    genSuccess,
    genError,
    getToken,
    stateRefetch,
  ]);

  useEffect(() => {
    if (!stateLoading && !stateError) {
      dispatch(setUserEmail(data?.data));
    }
  }, [stateLoading, stateError, data?.data, dispatch]);

  return (
    <div>
      <Toaster />
      {/* <Loading /> */}
      {/* */}
      {genLoading || (stateLoading && <Loading />)}
      {genLoading || stateLoading || <MainLayout />}
    </div>
  );
}

export default App;
