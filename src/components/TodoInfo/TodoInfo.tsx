import classNames from 'classnames';
import { UserInfo } from '../UserInfo/UserInfo';

import { TodoWithUser } from '../../types/TodoWithUser';

import './TodoInfo.scss';

export const TodoInfo: React.FC<TodoWithUser> = ({ title, completed, user }) => {
  const completedStatus = completed ? 'Completed' : 'Not completed';

  return (
    <>
      <h2 className="todo__title">{title}</h2>
      <p className={classNames('todo__completed', {
        'todo__completed--true': completed,
      })}
      >
        {completedStatus}
      </p>
      {user && (
        <div className="todo__user user">
          {user && (
            <UserInfo {...user} />
          )}
        </div>
      )}
    </>
  );
};
