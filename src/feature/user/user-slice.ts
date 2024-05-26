import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../types/user";

const initialState: IUser = {
  isAuth: true,
};

const userSlice = createSlice({
  name: '@user',
  initialState,
  reducers: {
    resetAuth: (state) => {
      return { ...state, isAuth: false }
    }
  }
})

export const { resetAuth } = userSlice.actions;
export default userSlice.reducer;