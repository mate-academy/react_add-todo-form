import { Todos } from "./Todos";

export interface Users {
  id: number;
  name: string;
  username: string;
  email: string;
  todos?: Todos;
}
