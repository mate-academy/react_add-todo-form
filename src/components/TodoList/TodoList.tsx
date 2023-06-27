import { TodoWithUser } from '../../types/TodoWithUser';
import { TodoInfo } from '../TodoInfo';

interface Props {
  todos: TodoWithUser[],
}

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (todo.user && <TodoInfo todo={todo} key={todo.id} />))}
    </section>
  );
};
