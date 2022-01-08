import React from 'react';
import { Todos } from '../types/Todos';
import { UserInfo } from '../UserInfo/UserInfo';
import './TodoInfo.scss';

type Props = {
  todo: Todos;
  // eslint-disable-next-line
  removeTodo: any,
};

export const TodoInfo: React.FC<Props> = ({ todo, removeTodo }) => (
  <>
    <td>
      {todo.title}
    </td>
    <td>
      {todo.completed ? 'completed' : 'in progress'}
    </td>
    {todo.user && <UserInfo user={todo.user} />}
    <td>
      <button
        type="button"
        className="button__remove"
        onClick={() => removeTodo(todo.id)}
      >
        remove todo
      </button>
    </td>
  </>
);
