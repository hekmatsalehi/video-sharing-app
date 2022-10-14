import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentVideo: null,
  loading: false,
  error: false,
}

export const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
    },
    fetchSuccess: (state, action) => {
      state.loading = false;
      state.currentVideo = action.payload;
    },
    fetchFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    like: (state, action) => {
      // check if the user id exist or not
      if(!state.currentVideo.likes.includes(action.payload)) {
        // because of react toolkit we can use push method and mutate our state
        // add user id to likes array
        state.currentVideo.likes.push(action.payload)
        // remove user id from dislikes array
        state.currentVideo.dislikes.splice(state.currentVideo.dislikes.findIndex((userId) => userId === action.payload), 1 )
      }
    },
    dislike: (state, action) => {
      // check if the user id exist or not
      if(!state.currentVideo.dislikes.includes(action.payload)) {
        // because of react toolkit we can use push method and mutate our state
        // add user id to likes array
        state.currentVideo.dislikes.push(action.payload)
        // remove user id from dislikes array
        state.currentVideo.likes.splice(state.currentVideo.likes.findIndex((userId) => userId === action.payload), 1 )
      }
    },
  }
});

export const {fetchStart, fetchSuccess, fetchFailure, like, dislike} = videoSlice.actions;

export default videoSlice.reducer;