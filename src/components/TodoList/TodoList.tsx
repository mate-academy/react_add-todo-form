import { TodoInfo } from '../TodoInfo';
import { Todo, User } from '../../services/types';

interface Props {
  todos: (Todo & { user?: User })[];
}

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => {
        return <TodoInfo key={todo.id} todo={todo} />;
      })}
    </section>
  );
};
