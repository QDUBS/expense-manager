import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userDetails: { email: "", password: "" },
  personalDetails: { firstName: "", lastName: "", mobileNumber: "" },
  professionalDetails: { department: "", role: "", staffID: 0 },
};

export const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    saveUserDetails: (state, action) => {
      state.userDetails.email = action.payload.email;
      state.userDetails.password = action.payload.password;
    },
    savePersonalDetails: (state, action) => {
      state.personalDetails.firstName = action.payload.firstName;
      state.personalDetails.lastName = action.payload.lastName;
      state.personalDetails.mobileNumber = action.payload.mobileNumber;
    },
    saveprofessionalDetails: (state, action) => {
      state.professionalDetails.department = action.payload.department;
      state.professionalDetails.role = action.payload.role;
      state.professionalDetails.staffID = action.payload.staffID;
    },
  },
});

// Action creators are generated for each case reducer function
export const { saveUserDetails, savePersonalDetails, saveprofessionalDetails } =
  signupSlice.actions;

export default signupSlice.reducer;
