import React from 'react';
import { Todo } from '../type/todo';
import { UserInfo } from '../UserInfo/UserInfo';

import './TodoInfo.scss';

type Props = {
  todo: Todo,
};

export const TodoInfo:React.FC<Props> = ({ todo }) => (
  <>
    <div className="Task">
      <input
        type="checkbox"
        id="todo"
        name="todo"
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
