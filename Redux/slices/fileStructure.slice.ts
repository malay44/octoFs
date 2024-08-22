import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const fileStructureSlice = createSlice({
  name: "fileStructure",
  initialState: initialState,
  reducers: {
    setFileStructure: (state, action) => {
      state = action.payload;
    },
  },
});

export const { setFileStructure } = fileStructureSlice.actions;
export default fileStructureSlice.reducer;
