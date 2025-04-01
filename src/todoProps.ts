import { UserProps } from './userProps';

export interface TodoProps {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user: UserProps | null;
}
