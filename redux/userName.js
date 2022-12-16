import {createSlice} from '@reduxjs/toolkit';

export const usernameSlide = createSlice({
  name: 'userName',
  initialState: {
    value: 0,
  },
  reducers: {
    updateUsername: (state, action) => {
      state.value = action.payload;
    },
  },
});
// Action creators are generated for each case reducer function
export const {updateUsername} = usernameSlide.actions;

export const selectUsername = state => state.userName.value;

export default usernameSlide.reducer;
