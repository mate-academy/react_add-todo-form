import React from 'react';
import classNames from 'classnames';
import { UserInfo } from '../UserInfo/UserInfo';
import './TodoInfo.scss';

export const TodoInfo:React.FC<Todo> = ({
  title,
  completed,
  user,
}) => (
  <>
    <h2 className="todo__title">{title}</h2>
    <h3
      className={classNames(
        'todo__condition',
        {
          'todo__condition-true': completed,
          'todo__condition-false': !completed,
        },
      )}
    >
      {completed
        ? <p>Is completed</p>
        : <p>Is not completed</p>}
    </h3>

    {user && <UserInfo {...user} />}
  </>
);
