import { TodoWithUser } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: TodoWithUser[];
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <section className="TodoList">
    {!!todos.length &&
      todos.map(todo => <TodoInfo key={todo.id} todo={todo} />)}
  </section>
);
