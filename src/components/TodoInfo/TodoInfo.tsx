import classNames from 'classnames';
import React from 'react';
import { UserInfo } from '../UserInfo';

import './TodoInfo.scss';

 type Props = {
   todo: Todo;
 };

export const TodoInfo: React.FC<Props> = ({ todo }) => (
  <>
    <h2 className="message-header">{todo.title}</h2>
    <span className="message-body">
      {todo.user && (
        <UserInfo user={todo.user} />
      )}
    </span>
    <br />
    <div className={classNames(
      'not-complete',
      {
        completed: todo.completed,
      },
    )}
    >
      {todo.completed ? 'Completed' : 'Not completed'}
    </div>
  </>
);
