import { UserTypes } from './UserTypes';

export interface PrepearedTodoTypes {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  user: UserTypes | null;
}
