import { TodoConfigurated } from '../../types/TodoConfigurated';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: TodoConfigurated[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <>
      {todos.map(todo => todo.user && <TodoInfo key={todo.id} todo={todo} />)}
    </>
  );
};
