import { Todo } from '../types/todos';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: Todo[],
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <section className="TodoList">
    {
      todos.map(todo => (
        <TodoInfo todo={todo} key={todo.id} />
      ))
    }
  </section>
);
