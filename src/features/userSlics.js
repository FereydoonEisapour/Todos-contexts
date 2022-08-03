import { createSlice } from "@reduxjs/toolkit";
console.log('<userSlics  /> renderd');
const initialState = {
  userName: null,
  userEmail: null,
  userAvatar: null,
  userPassword: null,
};
const userSlics = createSlice({
  name: "user",
  initialState,
  reducers: {
    setActiveUser: (state, action) => {
      state.userName = action.payload.userName;
      state.userEmail = action.payload.userEmail;
      state.userAvatar = action.payload.userAvatar;
      state.userPassword = action.payload.userPassword;
    },
    setUserLogOutState: (state) => {
      state.userName = null;
      state.userEmail = null;
      state.userAvatar = null;
      state.userPassword = null;
    },
  },
});
export const { setActiveUser, setUserLogOutState } = userSlics.actions;
export const selectUserName = (state) => state.user.userName;
export const selectUserEmail = (state) => state.user.userEmail;
export const selectUserAvatar = (state) => state.user.userAvatar;
export const selectUserPassword = (state) => state.user.userPassword;
export default userSlics.reducer;
