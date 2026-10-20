import { createSlice } from "@reduxjs/toolkit";

const ConnectionSlice = createSlice({
  name: "connection",
  initialState: [],
  reducers: {
    addConnections: (state, action) => action.payload,
    removeConnections: () => [],
  },
});

export const { addConnections, removeConnections } = ConnectionSlice.actions;
export default ConnectionSlice.reducer;
