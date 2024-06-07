import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
// PayloadAction
import axios from '../../utils/axios'
import { IArt, IArtsSlice, IChangeArtstoLike } from "../../types/arts";
import { IUser } from "../../types/user";

export const createArt = createAsyncThunk(
  'art/createArt',
  async (body: Omit<IArt, 'username' | 'author'>) => {
    try {
      const { data } = await axios.post('/arts', body)
      return data
    } catch (error) {
      console.log('createArt error', error)
    }
  }
)
// http://localhost:5000/api/arts

export const getAllArts = createAsyncThunk(
  'art/getAllArts',
  async () => {
    try {
      const { data } = await axios.get('/arts');
      console.log('response getAllArts', data)
      return data
    } catch (error) {
      console.log('getAllArts error', error)
    }
  }
)

export const updateLikeArt = createAsyncThunk(
  'art/updateLikeArt',
  async (artId: string, { getState, dispatch }) => {
    try {
      const token = (getState() as { user: IUser }).user.token;
      const { data } = await axios.patch(`arts/${artId}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      // console.log('postlike', data)
      return data
    } catch (error) {
      console.log('Error', error)
    }
  }
)

const initialState: IArtsSlice = {
  arts: [],
  popularArts: [],
  isLoading: 'idle',
  isError: null
};

const artsSlice = createSlice({
  name: '@arts',
  initialState,
  reducers: {
    changeArtstoLike: (state, action: PayloadAction<IArt>) => {
      console.log('action.payload', action.payload)
      const artId = action.payload._id
      const index = state.arts.findIndex(art => art._id === artId);
      if (index !== -1) {
        state.arts[index] = action.payload;
      }

    }
  },
  extraReducers(builder) {
    builder
      .addCase(createArt.fulfilled, (state, action) => {
        console.log('createArt.fulfilled', action.payload)
        state.arts = [...state.arts, action.payload]
      })
      .addCase(getAllArts.fulfilled, (state, action) => {
        state.arts = action.payload;
        // console.log('state.arts', state.arts)
      })
      .addMatcher((action) => action.type.endsWith('/pending'),
        (state) => {
          state.isLoading = 'loading';
          state.isError = null;
        })
      .addMatcher((action) => action.type.endsWith('/rejected'),
        (state, action) => {
          state.isLoading = 'idle';
          state.isError = 'error';
        })
      .addMatcher((action) => action.type.endsWith('/fulfilled'),
        (state, action) => {
          state.isLoading = 'idle';
          state.isError = null;
        })
  },
})

export const { changeArtstoLike } = artsSlice.actions;
export default artsSlice.reducer;