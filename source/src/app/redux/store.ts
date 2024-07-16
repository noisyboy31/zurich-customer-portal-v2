import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../redux/reducers/usersSlice";

const store = configureStore({
  reducer: {
    users: usersReducer,
  },
});

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
