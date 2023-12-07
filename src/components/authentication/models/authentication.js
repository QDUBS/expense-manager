import { UserType } from "@prisma/client";
import {
  JobSeekerPersonalProfileData,
  JobSeekerProfessionalProfileData,
  JobSeekerUserSignUpData,
  RecruiterProfileData,
  RecruiterUserSignUpData,
  UserRegistrationFormData,
} from "../types/signup";
import { createModel } from "@rematch/core";
import { RootModel } from "../../../redux/model";
import { ApiRoutes } from "../../../constants/api_routes";
import axios, { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { uploadFileToFileStack } from "@helpers/file_stack";

export const statusEnum = {
  SIGN_UP_PENDING,
  SIGN_UP_FAILED,
  SIGN_UP_SUCCEEDED,
}
export const signUpTypEnum = {
  CREDENTIALS,
  OAUTH,
}

export const initialSignUpState = {
  currentUserType: UserType.INDIVIDUAL,
  signUpCompletionStatus: SignUpCompletionStatus.SIGN_UP_PENDING,
  recruiterSignUpData: {
    companyAbout: "",
    companyName: "",
    companyAccountUrl: "",
    companyWebsite: "",
    companyAddress: "",
    companyIndustry: "",
    companySize: 0,
    companyType: 0,
    companyLogo: "",
    hasAcceptedTOC: false,
    email: "",
    password: "",
    userType: UserType.CORPORATE,
    isCompanyVerified: false,
    name: "",
  },
  jobSeekerSignUpData: {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    userType: UserType.INDIVIDUAL,
    mobileNumber: "",
    discipline: -1,
    specialty: -1,
    yearsOfExperience: -1,
  },
  signUpType: SignUpType.CREDENTIALS,
};

export const signUpModel = createModel({
  state: initialSignUpState,
  reducers: {
    SET_USER_TYPE(state, userType) {
      state.currentUserType = userType;
      return state;
    },
    SET_USER_REGISTRATION_INFORMATION(
      state,
      userRegistrationFormData
    ) {
      if (state.currentUserType == UserType.INDIVIDUAL) {
        state.jobSeekerSignUpData.email = userRegistrationFormData.email;
        state.jobSeekerSignUpData.password = userRegistrationFormData.password;
        state.jobSeekerSignUpData.userType = userRegistrationFormData.userType;
        return state;
      }
      if (state.currentUserType == UserType.CORPORATE) {
        state.recruiterSignUpData.email = userRegistrationFormData.email;
        state.recruiterSignUpData.password = userRegistrationFormData.password;
        state.recruiterSignUpData.userType = userRegistrationFormData.userType;
        return state;
      }
      return state;
    },
    SET_INDIVIDUAL_PERSONAL_DATA(
      state,
      jobSeekerPersonalProfileData
    ) {
      if (state.currentUserType === UserType.INDIVIDUAL) {
        state.jobSeekerSignUpData.firstName =
          jobSeekerPersonalProfileData.firstName;
        state.jobSeekerSignUpData.lastName =
          jobSeekerPersonalProfileData.lastName;
        state.jobSeekerSignUpData.mobileNumber =
          jobSeekerPersonalProfileData.mobileNumber;
        return state;
      }
      return state;
    },
    SET_USER_PROFESSIONAL_PROFILE_INFORMATION(
      state,
      userProfileData
    ) {
      if (state.currentUserType === UserType.INDIVIDUAL) {
        const jobSeekerProfessionalProfileData =
          userProfileData;
        state.jobSeekerSignUpData.discipline =
          jobSeekerProfessionalProfileData.discipline;
        state.jobSeekerSignUpData.specialty =
          jobSeekerProfessionalProfileData.specialty;
        state.jobSeekerSignUpData.yearsOfExperience =
          jobSeekerProfessionalProfileData.yearsOfExperience;
        return state;
      }
      if (state.currentUserType === UserType.CORPORATE) {
        const recruiterProfileData = userProfileData;
        state.recruiterSignUpData.name = recruiterProfileData.name;
        state.recruiterSignUpData.companyName =
          recruiterProfileData.companyName;
        state.recruiterSignUpData.hasAcceptedTOC =
          recruiterProfileData.hasAcceptedTOC;
        state.recruiterSignUpData.companyType =
          recruiterProfileData.companyType;
        state.recruiterSignUpData.companySize =
          recruiterProfileData.companySize;
        state.recruiterSignUpData.companyIndustry =
          recruiterProfileData.companyIndustry;
        state.recruiterSignUpData.companyLogo =
          recruiterProfileData.companyLogo;
        state.recruiterSignUpData.companyAbout =
          recruiterProfileData.companyAbout;
        state.recruiterSignUpData.companyAddress =
          recruiterProfileData.companyAddress;
        state.recruiterSignUpData.companyWebsite =
          recruiterProfileData.companyWebsite;
        state.recruiterSignUpData.companyAccountUrl =
          recruiterProfileData.companyAccountUrl;
        state.recruiterSignUpData.isCompanyVerified =
          recruiterProfileData.isCompanyVerified;
        return state;
      }
      return state;
    },
    RESET_USER() {
      return initialSignUpState;
    },
    SET_SIGNUP_COMPLETION_STATE(
      state,
      signUpCompletionStatus
    ) {
      state.signUpCompletionStatus = signUpCompletionStatus;
      return state;
    },
    SET_SIGNUP_TYPE(state, signUpType) {
      state.signUpType = signUpType;
      return state;
    },
  },
  effects: (dispatch) => ({
    async createCorporateUser(formData, rootState) {
      const companyLogoFile = formData.get("companyLogo");
      let companyLogoUrl = await uploadFileToFileStack(
        companyLogoFile,
        formData,
        "companyLogo"
      );
      formData.append("companyLogo",companyLogoUrl)
      await axios
        .post(ApiRoutes.corporateUserApiRoute, formData)
        .then((response) => {
          if (response.status === 200) {
            dispatch.signUpModel.SET_SIGNUP_COMPLETION_STATE(
              SignUpCompletionStatus.SIGN_UP_SUCCEEDED
            );
            toast.success("Sign Up Successful!");
          }
        })
        .catch((error) => {
          dispatch.signUpModel.SET_SIGNUP_COMPLETION_STATE(
            SignUpCompletionStatus.SIGN_UP_FAILED
          );
        });
    },
    async createIndividualUser(
      jobSeekerSignUpData,
      rootState
    ) {
      await axios
        .post(ApiRoutes.individualUserApiRoute, jobSeekerSignUpData)
        .then((response) => {
          if (response.status === 200) {
            dispatch.signUpModel.SET_SIGNUP_COMPLETION_STATE(
              SignUpCompletionStatus.SIGN_UP_SUCCEEDED
            );
            toast.success("Sign Up Successful!");
          }
        })
        .catch((error) => {
          // toast.error("Failed to SignUp!");
          dispatch.signUpModel.SET_SIGNUP_COMPLETION_STATE(
            SignUpCompletionStatus.SIGN_UP_FAILED
          );
        });
    },
  }),
});

