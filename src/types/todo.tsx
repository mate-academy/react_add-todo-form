export interface ITodo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user: IUser | undefined;
}

export interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
}

export type OnAddCallback = ({
  title,
  userId,
}: {
  title: string;
  userId: number;
}) => void;
