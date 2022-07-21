import React from 'react';
import { Todo } from '../../type/Todo';
import { UserInfo } from '../UserInfo/UserInfo';

type Props = {
  todo: Todo
};

export const TodoInfo: React.FC <Props> = ({ todo }) => (
  <>
    {todo.user && <UserInfo user={todo.user} completed={todo.completed} />}
    <div className="card-content title is-3" data-cy="title">
      {todo.title}
      <br />
      <p className="title is-5" data-cy="status">
        {todo.completed ? 'Complited' : 'Not Complited'}
      </p>
    </div>
  </>
);
