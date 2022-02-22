import { Todo } from '../../Types/TodoTypes';
import { User } from '../../Types/UserTypes';
import './TodoList.scss';

type Props = {
  preparedTodos: Todo[];
  users: User[];
};

export const TodoList: React.FC<Props> = ({ preparedTodos, users }) => (
  <ul className="todo__list">
    {preparedTodos.map(({ id, title, userId }) => {
      const person = users.find(user => userId === user.id);

      return (
        <li key={id} className="todo__item box">
          <span className="todo__title">
            <span className="tag is-success is-medium">TITLE:</span>
            <p className="tag is-success is-light is-medium">{title}</p>
          </span>
          {person && (
            <div className="todo__user">
              <span className="todo__user-name">
                <span className="tag is-success is-medium">NAME:</span>
                <p className="tag is-success is-light is-medium">
                  {person.name}
                </p>
              </span>
              <span className="todo__user-email">
                <span className="tag is-success is-medium">EMAIL:</span>
                <p className="tag is-success is-light is-medium">
                  {person.email}
                </p>
              </span>
            </div>
          )}
        </li>
      );
    })}
  </ul>
);
