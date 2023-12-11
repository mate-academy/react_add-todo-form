import { TodoType } from './TodoType';

export type TodoFormProps = {
  // setTodosList: React.Dispatch<React.SetStateAction<TodoType[]>>;
  onSubmit: (newTodo: TodoType) => void;
  newTodoId: number;
};
