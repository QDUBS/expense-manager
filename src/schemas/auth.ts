import * as yup from "yup";

export const userRegistrationFormSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required().min(3),
});

export const personalDetailsFormSchema = yup.object({
  firstName: yup
    .string()
    .required("First name cannot be blank")
    .min(2)
    .label("first name"),
  lastName: yup
    .string()
    .required("Last name cannot be blank")
    .min(2)
    .label("last name"),
  mobileNumber: yup.string().required("Please provide your mobile number"),
});

export const professionalDetailsFormSchema = yup.object({
  department: yup.string().required("Department cannot be blank").label("department"),
  role: yup.string().required("Role name cannot be blank").label("role"),
  staffID: yup
    .string()
    .required("Please provide your Staff ID")
    .label("staff ID"),
  type: yup.string().required("Role name cannot be blank").label("role"),
});

export const loginFormSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export const profileUpdateFormSchema = yup.object({
  firstName: yup
    .string()
    .required("First name cannot be blank")
    .min(2)
    .label("first name"),
  lastName: yup
    .string()
    .required("Last name cannot be blank")
    .min(2)
    .label("last name"),
  mobileNumber: yup.string().required("Please provide your mobile number"),
  department: yup
    .string()
    .required("Department cannot be blank")
    .label("department"),
  role: yup.string().required("Role name cannot be blank").label("role"),
  staffID: yup
    .string()
    .required("Please provide your Staff ID")
    .label("staff ID"),
  photo: yup.string(),
});
