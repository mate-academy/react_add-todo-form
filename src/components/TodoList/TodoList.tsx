import { TodoInfo } from '../TodoInfo';
import { ArrayOfTodos } from '../../types/Todos';

type Props = {
  todos: ArrayOfTodos
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <>
    {todos.map(todo => (
      <TodoInfo todo={todo} key={todo.id} />
    ))}
  </>
);
