import { ITodo } from '../../types/Todos.types';

export interface IForm {
  title: string;
  userId: string;
}

export interface IFormProps {
  setTodos: (todo: ITodo) => void;
}
