import { dispatch, store } from "@redux/store";
import { jobHandlers } from "../../../__mocks__/handlers/job_route_handlers";
import {
  authenticationHandlers,
  failedAuthenticationHandlers,
} from "../../../__mocks__/handlers/authentication_route_handlers";
import { expect } from "@jest/globals";
import {
  initialSignUpState,
  SignUpCompletionStatus,
} from "@components/authentication/models/authentication";
import {
  JobSeekerUserSignUpData,
  UserRegistrationFormData,
} from "@components/authentication/types/signup";
import { faker } from "@faker-js/faker";
import { UserType } from ".prisma/client";

const getAuthenticationState = () => store.getState().signUpModel;

const sampleIndividualRegistrationInfo = {
  email: faker.internet.email(),
  password: faker.internet.password(),
  userType: UserType.INDIVIDUAL,
};
const sampleIndividualUser = {
  discipline: 0,
  email: faker.internet.email(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  mobileNumber: faker.phone.number(),
  password: faker.internet.password(),
  specialty: 0,
  userType: UserType.INDIVIDUAL,
  yearsOfExperience: 5,
};

describe("Happy Authentication Routes", () => {
  beforeEach(() => {
    dispatch({ type: "RESET" });
    authenticationHandlers();
  });
  it("should return the initial state", () => {
    expect(getAuthenticationState()).toEqual(initialSignUpState);
  });
  it("should create a job seeker user when signup is successfull", async function () {
    await dispatch.signUpModel.createIndividualUser(sampleIndividualUser);
    expect(getAuthenticationState()?.signUpCompletionStatus).toEqual(
      SignUpCompletionStatus.SIGN_UP_SUCCEEDED
    );
  });
  it("should set the state to what the user chose", function () {
    dispatch.signUpModel.SET_USER_REGISTRATION_INFORMATION(
      sampleIndividualRegistrationInfo
    );
    expect(getAuthenticationState()?.currentUserType).toEqual(
      UserType.INDIVIDUAL
    );
    expect(
      getAuthenticationState()?.jobSeekerSignUpData.email.length
    ).toBeGreaterThan(0);
  });
});

describe("Sad Authentication Routes", () => {
  beforeEach(() => {
    dispatch({ type: "RESET" });
    failedAuthenticationHandlers();
  });
  it("should return the initial state", () => {
    expect(getAuthenticationState()).toEqual(initialSignUpState);
  });

  it("should fail to create a user if request fails", async function () {
    await dispatch.signUpModel.createIndividualUser(sampleIndividualUser);
    expect(getAuthenticationState()?.signUpCompletionStatus).toEqual(
      SignUpCompletionStatus.SIGN_UP_FAILED
    );
  });
});
