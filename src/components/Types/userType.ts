export interface User {
  user: string[];
  id: number;
  name: string;
  username: string;
  email: string;
}

export type UserMap = {
  [userId: number]: {
    id: number;
    name: string;
    username: string;
    email: string;
  };
};
