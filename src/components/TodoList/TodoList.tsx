import classNames from 'classnames';
import { Todo } from '../../react-app-env';
import { TodoInfo } from '../TodoInfo/TodoInfo';
import { UserInfo } from '../UserInfo/UserInfo';

import './TodoList.scss';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <table className="table">
    <thead className="thead">
      <tr className="thead__row">
        <td className="thead__column">Name</td>
        <td className="thead__column">Username</td>
        <td className="thead__column">Email</td>
        <td className="thead__column">Title</td>
        <td className="thead__column">Status</td>
      </tr>
    </thead>
    <tbody className="tbody">
      {todos.map((todo) => {
        return (
          <tr
            className={classNames('tbody__row', {
              tbody__done: todo.completed,
            })}
            key={todo.id}
          >

            {todo.user && (
              <UserInfo
                name={todo.user.name}
                username={todo.user.username}
                email={todo.user.email}
              />
            )}

            <TodoInfo
              title={todo.title}
              status={todo.completed}
            />
          </tr>
        );
      })}
    </tbody>
  </table>
);
