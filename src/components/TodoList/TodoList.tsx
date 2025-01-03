import { User } from '../../types';
import { Todo } from '../../types';
import { TodoInfo } from '../TodoInfo';

export const TodoList = ({ todos }: { todos: (Todo & { user: User })[] }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo key={todo.id} todo={todo} />
      ))}
    </section>
  );
};

