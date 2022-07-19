import React from 'react';
import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo/UserInfo';

type Props = {
  todo: Todo,
};

export const TodoInfo: React.FC<Props> = ({ todo }) => (
  <>
    {todo.user && <UserInfo user={todo.user} />}
    <div className="todo__info" key={todo.id}>
      <p className="todo__id">
        <strong>ID: </strong>
        {todo.id}
      </p>

      <p className="todo__title">
        <strong>Title: </strong>
        {todo.title}
      </p>

      <p className="todo__userId">
        <strong>UserID: </strong>
        {todo.userId}
      </p>

      <p className="todo__Complited" data-cy="status">
        <strong>Complited: </strong>
        {
          todo.completed
            ? 'Done'
            : 'In progress'
        }
      </p>
    </div>
  </>
);
