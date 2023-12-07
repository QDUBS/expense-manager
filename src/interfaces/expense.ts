export interface IExpenseFormInputs {
  merchant: string;
  total: string;
  currency: string;
  category: string;
  description: string;
  receipt?: File;
}

export interface IExpenseUpdateFormInputs {
  merchant: string;
  total: string;
  currency: string;
  category: string;
  description: string;
  receipt?: string;
  expense_stage: string;
}
