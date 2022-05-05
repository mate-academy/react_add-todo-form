import classNames from 'classnames';
import { Todo } from '../../Types/Todo';
import { UserInfo } from '../UserInfo/UserInfo';

import './TodoInfo.scss';

export const TodoInfo: React.FC<Todo> = ({ title, completed, user }) => (
  <div className="todo">
    <h2 className="todo__title">{title}</h2>
    <h3 className={classNames(
      'todo__status',
      {
        'todo__status--completed': completed === true,
      },
    )}
    >
      {completed ? 'Completed' : 'In progress'}
    </h3>
    {user && <UserInfo {...user} />}
  </div>
);
