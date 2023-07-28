import { createSlice } from "@reduxjs/toolkit";

type CounterState = {
  user: {
    email: string | null;
    role: string | null;
  };
};

const initialState: CounterState = {
  user: {
    email: null,
    role: null,
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
});

export default userSlice.reducer;
