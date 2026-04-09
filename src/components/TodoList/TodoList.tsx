import { TodoInfo } from '../TodoInfo/TodoInfo';
import { Todo } from '../../types/todo';

type Props = {
  todos: Todo[];
};

export const TodoList = ({ todos }: Props): JSX.Element => {
  return (
    <>
      {todos.map((todo: Todo) => (
        <TodoInfo key={todo.id} todo={todo} />
      ))}
    </>
  );
};
