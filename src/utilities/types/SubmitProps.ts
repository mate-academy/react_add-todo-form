import { Todo } from './Todo';

export type SubmitProps = {
  setId: React.Dispatch<React.SetStateAction<number>>;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  id: number;
  title: string;
  user: number;
  setShowErrorTitle: React.Dispatch<React.SetStateAction<boolean>>;
  setShowErrorUser: React.Dispatch<React.SetStateAction<boolean>>;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setUser: React.Dispatch<React.SetStateAction<number>>;
};
