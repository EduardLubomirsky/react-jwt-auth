import * as bcrypt from "bcrypt";

export const getHash = async (input: string) => {
  const hash = bcrypt.hashSync(input, 10);
  return hash;
};

export const validateHash = async (password, hash) => {
  return bcrypt.compareSync(password, hash);
}
