import { TodoInfo } from '../TodoInfo/TodoInfo';
import type { Todo } from '../../types';

export const TodoList = ({ todos }: { todos: Todo[] }) => {
  return (
    <>
      {todos.map(todo => (
        <TodoInfo key={todo.id} todo={todo} />
      ))}
    </>
  );
};
