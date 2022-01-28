import React from 'react';
import classNames from 'classnames';

import { UserInfo } from '../UserInfo';

type Props = {
  todo: PrepearedTodo
};

export const TodoInfo:React.FC<Props> = ({ todo }) => (
  <div className={classNames('item', { active: !todo.completed })}>
    <input
      type="checkbox"
      checked={todo.completed}
      readOnly
    />
    <h3
      className="title-todo"
    >
      {todo.title}
    </h3>
    {todo.user && <UserInfo user={todo.user} />}
  </div>
);
