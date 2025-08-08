import { TodoInfo } from '../TodoInfo';
import { User, Todo } from '../../types/types';

type Props = {
  todos: (Todo & { user: User })[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo key={todo.id} todo={todo} user={todo.user} />
      ))}
    </section>
  );
};
