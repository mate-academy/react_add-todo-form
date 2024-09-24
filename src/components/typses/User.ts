import { Todos } from './Todo';

export interface User extends Todos {
  id: number;
  name: string;
  username: string;
  email: string;
}
