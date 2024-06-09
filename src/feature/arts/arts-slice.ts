import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
// PayloadAction
import axios from '../../utils/axios'
import { IArt, IArtsSlice } from "../../types/arts";
import { IUser } from "../../types/user";

interface IPropsCreateRooms {
  token: string,
  nameRoom: string
}

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
  async (artId: string, { getState }) => {
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
// export const updateCommentArt = createAsyncThunk(
//   'art/updateCommentArt',
//   async (artId: string, { getState, dispatch }) => {
//     try {
//       const token = (getState() as { user: IUser }).user.token;
//       const { data } = await axios.patch(`arts/${artId}/comment`,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         }
//       );
//       // console.log('postlike', data)
//       return data
//     } catch (error) {
//       console.log('Error', error)
//     }
//   }
// )
export const getAllRooms = createAsyncThunk(
  'art/getAllRooms',
  async () => {
    try {
      const { data } = await axios.get('/sort');
      // console.log('response getAllRooms', data)
      return data
    } catch (error) {
      console.log('getAllRooms error', error)
    }
  }
)
export const createRoom = createAsyncThunk(
  'art/createRoom',
  async (body: IPropsCreateRooms) => {
    try {
      const { data } = await axios.post(`sort`,
        { nameRoom: body.nameRoom },
        {
          headers: {
            Authorization: `Bearer ${body.token}`
          }
        }
      );
      console.log('Созданая команата', data)
      return data
    } catch (error) {
      console.log('createArt error', error)
    }
  }
)
export const getOneArt = createAsyncThunk(
  'art/getOneArt',
  async (id: string) => {
    try {
      const { data } = await axios.get(`http://localhost:5000/api/arts/${id}`);
      console.log('getOneArt', data)
      return data
    } catch (error) {
      console.log('Не удалось получить ART', error)
    }
  }
)



const initialState: IArtsSlice = {
  arts: [],
  popularArts: [],
  isLoading: 'idle',
  isError: null,
  detailArt: null,
  rooms: [],
  activeRoom: 'Common'
};

const artsSlice = createSlice({
  name: '@arts',
  initialState,
  reducers: {
    changeArtstoLike: (state, action: PayloadAction<IArt>) => {
      console.log('changeArtstoLike', action.payload)
      const artId = action.payload._id
      const index = state.arts.findIndex(art => art._id === artId);
      if (index !== -1) {
        state.arts[index] = action.payload;
      }
    },
    // changeArtstoComment: (state, action: PayloadAction<IArt>) => {
    //   console.log('changeArtstoComment', action.payload)
    //   const artId = action.payload._id
    //   const index = state.arts.findIndex(art => art._id === artId);
    //   if (index !== -1) {
    //     state.arts[index] = action.payload;
    //   }
    // },
    changeRoom: (state, action: PayloadAction<string>) => {
      state.activeRoom = action.payload;
    },
    changeArtstoLikeDetailArt: (state, action: PayloadAction<IArt>) => {
      state.detailArt = action.payload
    },
    changeArtstoCommentDetailArt: (state, action: PayloadAction<IArt>) => {
      state.detailArt = action.payload
    },
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
      .addCase(getAllRooms.fulfilled, (state, action) => {
        state.rooms = action.payload;
        // console.log('state.arts', state.arts)
      })
      .addCase(createRoom.fulfilled, (state, action) => {
        state.rooms = [...state.rooms, action.payload];
        // console.log('state.arts', state.arts)
      })
      .addCase(getOneArt.fulfilled, (state, action) => {
        state.detailArt = action.payload;
        // console.log('state.arts', state.arts)
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

export const artSelect = (arts: IArt[], activeRoom: string, author: string, artName: string, artDescript: string) => {
  return arts
    .filter(art => {
      // Фильтрация по комнате
      if (activeRoom && activeRoom !== 'Common') {
        return art.room.toLocaleLowerCase() === activeRoom.toLocaleLowerCase();
      }
      return true;
    })
    .filter(art => {
      // Фильтрация по строке поиска автор
      // if (author) {
      //   return art.user.firstName.toLocaleLowerCase().includes(author.toLocaleLowerCase());
      // }
      // return true;
      const textMatch = author
        ? new RegExp(author.trim().split(/\s+/).map(word => `(?=.*${word})`).join(''), 'i').test(art.user.firstName)
        : true;

      return textMatch;
    })
    .filter(art => {
      // Фильтрация по строке поиска названия
      // if (artName) {
      //   return art.title.toLocaleLowerCase().includes(artName.toLocaleLowerCase())
      // }
      // return true
      const textMatch = artName
        ? new RegExp(artName.trim().split(/\s+/).map(word => `(?=.*${word})`).join(''), 'i').test(art.title)
        : true;

      return textMatch;
    })
    .filter(art => {
      // Фильтрация по строке поиска названия
      // if (artDescript) {
      //   return art.text.toLocaleLowerCase().includes(artDescript.toLocaleLowerCase())
      // }
      // return true
      const textMatch = artDescript
        ? new RegExp(artDescript.trim().split(/\s+/).map(word => `(?=.*${word})`).join(''), 'i').test(art.text)
        : true;

      return textMatch;
    });
}
export const artSelectProfile = (arts: IArt[] | undefined, artName: string, artDescript: string) => {
  if (arts) {
    return arts
      .filter(art => {
        // Фильтрация по строке поиска названия
        // if (artName) {
        //   return art.title.toLocaleLowerCase().includes(artName.toLocaleLowerCase())
        // }
        // return true
        const textMatch = artName
          ? new RegExp(artName.trim().split(/\s+/).map(word => `(?=.*${word})`).join(''), 'i').test(art.title)
          : true;

        return textMatch;
      })
      .filter(art => {
        // Фильтрация по строке поиска названия
        // if (artDescript) {
        //   return art.text.toLocaleLowerCase().includes(artDescript.toLocaleLowerCase())
        // }
        // return true
        const textMatch = artDescript
          ? new RegExp(artDescript.trim().split(/\s+/).map(word => `(?=.*${word})`).join(''), 'i').test(art.text)
          : true;

        return textMatch;
      });
  } else {
    return []
  }
}

export const { changeArtstoLike, changeRoom, changeArtstoLikeDetailArt, changeArtstoCommentDetailArt } = artsSlice.actions;
export default artsSlice.reducer;