import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
// PayloadAction
import { ILogin, IRegisterUser, IUser, IUserProfile } from "../../types/user";
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
        console.log('Getme', data)
        return data

      } else {
        throw new Error('Произошла ошибка при авторизация')
      }
    } catch (error: any) {
      throw new Error(error.message || 'Произошла ошибка при авторизация');
    }
  }
)
export const updateFollowerUser = createAsyncThunk(
  'art/updateFollowerUser',
  async (userId: string, { getState }) => {
    try {
      const token = (getState() as { user: IUser }).user.token;
      const { data } = await axios.patch(`follower/${userId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      console.log('Обновленный User', data)
      return data
    } catch (error) {
      console.log('Error', error)
    }
  }
)
export const updateUnsubUser = createAsyncThunk(
  'art/updateUnsubUser',
  async (userId: string, { getState }) => {
    try {
      const token = (getState() as { user: IUser }).user.token;
      const { data } = await axios.patch(`unsub/${userId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      console.log('Обновленный User после отписки', data)
      return data
    } catch (error) {
      console.log('Error', error)
    }
  }
)


const initialState: IUser = {
  isAuthenticated: false,
  token: '',
  myId: '',
  userInfo: {},
  isLoading: 'idle',
  isError: null
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
    changeArtstoLikeProfile: (state, action: PayloadAction<IArt>) => {
      console.log('action.payload', action.payload)
      const artId = action.payload._id
      const index = state.userInfo.arts.items.findIndex((art: IArt) => art._id === artId);
      if (index !== -1) {
        state.userInfo.arts.items[index] = action.payload;
      }

    },
    setUserAuth: (state, action: PayloadAction<string>) => {
      state.token = action.payload
      state.isAuthenticated = true
      // console.log('isAuthenticated in Slice', state.isAuthenticated)
    },
    getMeReducer: (state, action: PayloadAction<IUserProfile>) => {
      state.userInfo = action.payload;
      state.myId = action.payload._id;
    },
    getUserReducer: (state, action: PayloadAction<IUserProfile>) => {
      state.userInfo = action.payload;
    },
  },
  extraReducers(builder) {
    builder
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
      .addCase(updateFollowerUser.fulfilled, (state, action) => {
        state.userInfo = action.payload
      })
      .addCase(updateUnsubUser.fulfilled, (state, action) => {
        state.userInfo = action.payload
      })
      .addMatcher((action) => action.type.endsWith('/pending'),
        (state) => {
          state.isLoading = 'loading';
          state.isError = null;
        })
      .addMatcher((action) => action.type.endsWith('/rejected'),
        (state) => {
          state.isLoading = 'idle';
          state.isError = 'error';
        })
      .addMatcher((action) => action.type.endsWith('/fulfilled'),
        (state) => {
          state.isLoading = 'idle';
          state.isError = null;
        })
  },
})

export const { resetAuth, setUserAuth, changeArtstoLikeProfile, getMeReducer, getUserReducer } = userSlice.actions;
export default userSlice.reducer;