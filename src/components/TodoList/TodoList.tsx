import { TodoWithUser } from '../../types/TodoType';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: TodoWithUser[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <>
      {todos.map((todo: TodoWithUser) => (
        <TodoInfo key={todo.id} todo={todo} />
      ))}
    </>
  );
};
