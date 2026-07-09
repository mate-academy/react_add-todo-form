import { UserType } from './UserType';

export interface TodoType {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

export type TodoWithUser = TodoType & {
  user: UserType | undefined;
};
