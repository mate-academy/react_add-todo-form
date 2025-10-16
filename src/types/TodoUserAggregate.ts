import { Todo } from "./Todo";
import { User } from "./User";

export type TodoUserAggregate = Todo & {
  user?: User;
};
