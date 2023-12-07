const bcrypt = require("bcryptjs");
import { v4 as uuidv4 } from "uuid";
import { add } from "date-fns";

const ROUNDS = 10;
const VERIFICATION_TOKEN_DURATION = 30; //minutes

export const hash = (password: string) => {
  return bcrypt.hashSync(password, ROUNDS);
};

export const generateVerificationToken = () => {
  return uuidv4();
};

export const generateVerificationTokenExpiry = () => {
  return add(new Date(), { minutes: VERIFICATION_TOKEN_DURATION });
};

export const comparePassword = (
  plainPassword: string,
  hashedPassword: string | null
) => {
  return bcrypt.compareSync(plainPassword, hashedPassword);
};
