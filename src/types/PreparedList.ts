import { UserType } from './UserType';

export interface PreparedList {
  user: UserType | null,
  id: number,
  title: string,
  completed: boolean,
}
