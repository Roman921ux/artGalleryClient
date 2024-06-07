import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
// PayloadAction
import { ILogin, IRegisterUser, IUser } from "../../types/user";
import axios from '../../utils/axios'
import { IArt } from "../../types/arts";

export const registerThunk = createAsyncThunk(
  'user/register',
  async (body: IRegisterUser) => {
    try {
      const res = await axios.post('/auth/register', body)
      const data = await res.data
      console.log('registerThunk', data)
    } catch (error: any) {
      throw new Error(error.message || 'Произошла ошибка при регистрации');
    }
  }
);

export const loginThunk = createAsyncThunk(
  'user/login',
  async (body: ILogin) => {
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
      const data = await res.json()
      if (res.ok) {
        return data
      } else {
        throw new Error('Произошла ошибка при авторизация')
      }
    } catch (error: any) {
      throw new Error(error.message || 'Произошла ошибка при авторизация');
    }
  }
)

export const getMe = createAsyncThunk(
  'user/getMe',
  async (token: string) => {
    try {
      const res = await fetch('http://localhost:5000/api/auth/me', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
      const data = await res.json()
      if (res.ok) {
        // console.log('Getme', data)
        return data

      } else {
        throw new Error('Произошла ошибка при авторизация')
      }
    } catch (error: any) {
      throw new Error(error.message || 'Произошла ошибка при авторизация');
    }
  }
)


const initialState: IUser = {
  isAuthenticated: false,
  token: '',
  userInfo: {},
};

const userSlice = createSlice({
  name: '@user',
  initialState,
  reducers: {
    resetAuth: (state) => {
      state.userInfo = null,
        state.token = null,
        state.isAuthenticated = false,
        localStorage.removeItem('token');
    },
    setUserAuth: (state, action: PayloadAction<string>) => {
      state.token = action.payload
      state.isAuthenticated = true
      // console.log('isAuthenticated in Slice', state.isAuthenticated)
    }
  },
  extraReducers(builder) {
    builder
      .addCase(registerThunk.fulfilled, (_, action) => {
        // console.log('extraR', action.payload)
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.userInfo = action.payload
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        console.log('extraL', action.payload);
        state.userInfo = action.payload.userData;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        //
        localStorage.setItem('token', action.payload.token);
      })
  },
})

export const { resetAuth, setUserAuth } = userSlice.actions;
export default userSlice.reducer;