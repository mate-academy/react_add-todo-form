import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo/UserInfo';
import './TodoInfo.scss';

type Props = {
  todo: Todo,
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  return (
    <>
      <li
        className={classNames(
          'TodoInfo',
          {
            'TodoInfo--completed': todo.completed,
          },
        )}
        data-id={todo.id}
      >
        <div className="TodoInfo__title">
          {todo.title}
        </div>

        <div className="TodoInfo--completed">
          {todo.completed ? 'Completed by:' : 'Not completed by:'}
        </div>
        {todo.user !== null ? <UserInfo user={todo.user} /> : <></>}
      </li>
    </>
  );
};
