import { UserProps } from './UserProps';

export interface TodoProps {
  user?: UserProps;
  id: number;
  completed: boolean;
  title: string;
  userId: number;
}
