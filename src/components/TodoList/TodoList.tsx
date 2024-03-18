import { Todo } from '../../types';
import { TodoInfo } from '../TodoInfo';

interface Props {
  todos: Todo[];
}

export const TodoList: React.FC<Props> = ({ todos }) => (
  <section className="TodoList">
    {todos.length
      ? todos.map((todo: Todo) => <TodoInfo key={todo.id} todo={todo} />)
      : ''}
  </section>
);
