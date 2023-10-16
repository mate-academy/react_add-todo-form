import { TodoInfo } from '../TodoInfo';
import { Todos } from '../../types/types';

type Props = {
  todos: Todos[];
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <section className="TodoList">
    <ul className="TodoList__list">
      {todos.map(todo => (
        <li key={todo.id} className="TodoList__item">
          <TodoInfo todo={{ ...todo, user: undefined }} />
        </li>
      ))}
    </ul>
  </section>
);
