import {createSlice} from '@reduxjs/toolkit';

export const userSlide = createSlice({
  name: 'userEmail',
  initialState: {
    value: 0,
  },
  reducers: {
    updateEmail: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {updateEmail} = userSlide.actions;

export const selectUserEmail = state => state.userEmail.value;

export default userSlide.reducer;
