import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  location: "",
  memberSince: "",
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    updateProfileData: (state, action) => {
      const { name, location, memberSince } = action.payload;
      if (name !== undefined) state.name = name;
      if (location !== undefined) state.location = location;
      if (memberSince !== undefined) state.memberSince = memberSince;
    },

    clearProfile: (state) => {
      state.name = "";
      state.location = "";
      state.memberSince = "";
    },
  },
});

export const { updateProfileData, clearProfile } = profileSlice.actions;
export default profileSlice.reducer;
