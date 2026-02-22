import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { TodoInfo } from '../TodoInfo';

interface Prop {
  users?: User[];
  todos: Todo[];
}

export const TodoList = ({ todos }: Prop) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo todo={todo} key={todo.id} />
      ))}
    </section>
  );
};
