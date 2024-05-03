export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

export interface TodoComplete {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user: User | null;

  setId?(id: number): void;
}

export interface TodoListProps {
  todos: TodoComplete[];
}

export interface TodoInfoProps {
  todo: TodoComplete;
}

export interface UserInfosProps {
  user: User | null;
}

export type TodoFormProps = {
  onSubmit: (todo: TodoComplete) => void;
};
