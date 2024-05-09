import { ITodo } from '../../types/Todos.types';

export interface IForm {
  title: string;
  userId: string;
}

export interface IFormProps {
  todos: ITodo[];
  setTodos: (todo: ITodo) => void;
}
