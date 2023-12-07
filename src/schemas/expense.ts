import * as yup from "yup";

export const expenseFormSchema = yup.object({
  merchant: yup.string().required("Please add a merchant"),
  total: yup.number().required("Please add expense total"),
  currency: yup.string().required("Please add currency"),
  category: yup.string().required("Please select a category"),
  description: yup
    .string()
    .required("Please add a description for this expense"),
  receipt: yup.mixed(),
});

export const expenseUpdateFormSchema = yup.object({
  merchant: yup.string().required("Please add a merchant"),
  total: yup.number().required("Please add expense total"),
  currency: yup.string().required("Please add currency"),
  category: yup.string().required("Please select a category"),
  description: yup
    .string()
    .required("Please add a description for this expense"),
  receipt: yup.string(),
  expense_stage: yup.string().required("Expense stage cannot be blank"),
});