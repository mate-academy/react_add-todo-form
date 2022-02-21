import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../data/Todo';
import { UserInfo } from '../UserInfo/UserInfo';
import './TodoInfo.scss';

type Props = {
  todo: Todo,
};

export const TodoInfo: React.FC<Props> = ({ todo }) => (
  <div className={classNames('todoInfo', { todoInfo__completed: todo.completed }, { todoInfo__inProgress: !todo.completed })}>
    <div>
      <h3 className="todoInfo__title">
        {todo.title}
      </h3>
      <span className="todoInfo__user">
        {todo.user?.username}
      </span>
      <div className="todoInfo__userinfo">
        {todo.user && (
          <UserInfo user={todo.user} />
        )}
      </div>
    </div>
    <div>
      <span className="todoInfo__status">
        {todo.completed
          ? 'Completed'
          : 'In Progress...'}
      </span>
    </div>
  </div>
);
