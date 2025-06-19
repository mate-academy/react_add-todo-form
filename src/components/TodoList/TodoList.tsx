import { TodoInfo } from '../TodoInfo';
import { Todo } from '../../services/Todos';
import { User } from '../../services/User';

export const TodoList = ({ user, todos }: { user: User[]; todos: Todo[] }) => (
  <section className="TodoList">
    <h2 className="TodoList__title">Todos</h2>

    <ul className="TodoList__list">
      {todos.map(todo => {
        const foundUser = user.find(u => u.id === todo.userId);

        return (
          <li
            key={todo.id}
            className={`TodoList__item ${todo.completed ? 'TodoList__item--completed' : ''}`}
          >
            {foundUser && <TodoInfo todo={todo} user={foundUser} />}
          </li>
        );
      })}
    </ul>
  </section>
);
