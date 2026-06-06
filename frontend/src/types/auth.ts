export interface User {
  id: string;
  username: string;
  email: string;
  role: "admin";
}

export interface LoginInput {
  username: string;
  password: string;
}
