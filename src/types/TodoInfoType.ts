import { UserInfoType } from './UserInfoType';

export interface TodoInfoType {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user: UserInfoType | null;
}
