import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
import ConnectionReducer from "./ConnectionSlice";
import RequestReducer from "./RequestSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    connections: ConnectionReducer,
    requests: RequestReducer,
  },
});

export default appStore;
