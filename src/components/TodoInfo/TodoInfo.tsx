import React from 'react';

import { UserInfo } from '../UserInfo/UserInfo';

import { Todo } from '../../types/Todo';
import './TodoInfo.scss';

type Props = {
  todo: Todo,
};

export const TodoInfo: React.FC<Props> = ({ todo }) => (
  <>
    <div className="todo-info__item">
      <input
        type="checkbox"
        name="todo"
        id="todo"
        value="todo"
        checked={todo.completed === true ? todo.completed : false}
      />
      <label
        htmlFor="todo"
        data-content={todo.title}
      >
        {todo.title}
      </label>
    </div>
    {todo.user && <UserInfo user={todo.user} />}
  </>
);
