export type TUser = {
  email: string;
  password: string;
};

export type TRegister = {
  email: string;
  password: string;
  name: string;
};

export type TUpUser = {
  email: string;
  password?: string;
  name: string;
};
