export type TodoId = number;

export interface Todo {
  id: TodoId;
  title: string;
  completed: boolean;
  userId: number;
}
