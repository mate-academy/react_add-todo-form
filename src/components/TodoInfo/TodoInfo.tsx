import React from 'react';
import classNames from 'classnames';
import './todoInfo.scss';
import UserInfo from '../UserInfo/UserInfo';

type Props = {
  todo: Todo,
};

const TodoInfo: React.FC<Props> = ({ todo }) => {
  const { user, title, completed } = todo;

  return (
    <div className="todo">
      <h1 className="todo__title">
        {title}
      </h1>

      <div className="todo__status">
        Status:
        <p className={classNames(
          'todo__notCompleated',
          { todo__compleated: completed },
        )}
        >
          {completed ? (
            ' Compleated'
          ) : (
            ' In progress'
          )}
        </p>
      </div>

      <div className="todo__user">
        {user && <UserInfo user={user} />}
      </div>
    </div>
  );
};

export default TodoInfo;
