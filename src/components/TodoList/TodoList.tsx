import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo';
import '../../App.scss';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <section>
    <ul className="TodoList">
      {todos.map(todo => (
        <li key={todo.id}>
          <TodoInfo todo={todo} />
        </li>
      ))}
    </ul>

  </section>
);
