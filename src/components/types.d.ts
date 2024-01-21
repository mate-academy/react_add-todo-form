export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};
export type ToDoWithUser = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user: User;
};
export type ToDosWithUser = ToDoWithUser[];
export interface UserProps {
  user: User
}
export interface ToDoWithUserProps {
  todo: ToDoWithUser
}
export interface ToDosWithUserProps {
  todos: ToDosWithUser
}
