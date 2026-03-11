import { TodoInfo } from '../TodoInfo';
import Todo from '../../types/Todo';

interface TodoListInterface {
  todoList: Todo[];
}

export const TodoList = ({ todoList }: TodoListInterface) => {
  return (
    <>
      {todoList.map((todo: Todo) => (
        <TodoInfo todo={todo} key={todo.id} />
      ))}
    </>
  );
};
