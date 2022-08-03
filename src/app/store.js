import { configureStore } from "@reduxjs/toolkit";
import userSlics from "../features/userSlics";
console.log('<Store /> renderd');
export const store = configureStore({
  reducer: {
    user: userSlics,
  },
});
