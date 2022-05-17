import React from 'react';
import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo';
import './TodoInfo.scss';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => (
  <>
    <div className="todo-info">
      <div className="todo-info__item">
        <span className="todo-info__title">Task:</span>
        {' '}
        {todo.title}
      </div>
      <div className="todo-info__item">
        <span className="todo-info__title">Status:</span>
        {' '}
        <p className="todo-info__status">
          {todo.completed
            ? 'all information completed'
            : 'information is being specified'}
        </p>
      </div>
    </div>
    {todo.user !== null
      ? <UserInfo userInf={todo.user} />
      : 'information is absent'}
  </>
);
