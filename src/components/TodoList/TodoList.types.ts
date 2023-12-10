export interface TodoListProps {
  todos: Todo[];
}

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}
