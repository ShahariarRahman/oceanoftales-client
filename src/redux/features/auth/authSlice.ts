import { auth } from "@/lib/firebase";
import { GoogleAuthProvider, signInWithPopup } from "@firebase/auth";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type CounterState = {
  user: {
    email: string | null;
    role: string | null;
  };
  platform: "custom" | "firebase";
  isLoading: boolean;
  isError: boolean;
  error: string | null;
};

const initialState: CounterState = {
  user: {
    email: null,
    role: null,
  },
  platform: "firebase",
  isLoading: true,
  isError: false,
  error: null,
};

export const googleLogin = createAsyncThunk("user/google-login", async () => {
  const provider = new GoogleAuthProvider();
  const data = await signInWithPopup(auth, provider);
  return data.user.email;
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserEmail: (state, action: PayloadAction<string | null>) => {
      state.user.email = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setPlatform: (state, action: PayloadAction<"custom" | "firebase">) => {
      state.platform = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(googleLogin.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(googleLogin.fulfilled, (state, action) => {
        state.user.email = action.payload;
        state.isLoading = false;
      })
      .addCase(googleLogin.rejected, (state, action) => {
        state.user.email = null;
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message!;
      }),
});

export const { setUserEmail, setLoading, setPlatform } = userSlice.actions;
export default userSlice.reducer;
