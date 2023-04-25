import { TodoInfo } from '../TodoInfo';
import { Todo } from '../../types/todo';

type Props = {
  todos: Todo[],
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <TodoInfo todo={todo} data-id={todo.id} />
          </li>
        ))}
      </ul>
    </section>
  );
};
