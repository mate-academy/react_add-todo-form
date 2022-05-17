import React from 'react';
import { Todos } from '../types/types';
import { UsersInfo } from '../UsersInfo/UsersInfo';

type Props = {
  todo: Todos,
};

export const TodosInfo:React.FC<Props> = ({ todo }) => (
  <div>
    <div className="todoInfo">
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

    {todo.user && <UsersInfo user={todo.user} />}
  </div>
);
