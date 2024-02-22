import bcrypt from "bcrypt";

const hashPassword = async (password: string): Promise<string> => {
  const bcryptSalt = process.env.BCRYPT_SALT as string;
  const hashedPassword = await bcrypt.hash(password, bcryptSalt);
  return hashedPassword;
};

export default hashPassword;
