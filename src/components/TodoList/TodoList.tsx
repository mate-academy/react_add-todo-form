import { TodoAndUser } from '../../types/TodoAndUser';
import { TodoInfo } from '../TodoInfo';

type Props = {
  allTodos: TodoAndUser[]
};

export const TodoList: React.FC<Props> = ({ allTodos }) => {
  return (
    <section className="TodoList">
      {allTodos.map(todo => (
        <TodoInfo todo={todo} key={todo.id} />
      ))}
    </section>
  );
};
