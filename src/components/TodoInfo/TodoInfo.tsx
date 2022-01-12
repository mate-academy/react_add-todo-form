import React from 'react';
import classNames from 'classnames';
import { Todos } from '../types/Todos';
import { UserInfo } from '../UserInfo/UserInfo';
import './TodoInfo.scss';

type Props = {
  todo: Todos;
  removeTodo: (id: number) => void,
  switchTodo: (id: number, completed: boolean) => void,
};

export const TodoInfo: React.FC<Props> = ({ todo, removeTodo, switchTodo }) => (
  <>
    <td>
      <button
        type="button"
        className={classNames(
          'button',
          'button__switch',
          { 'button__switch--todo': todo.completed },
        )}
        onClick={() => switchTodo(todo.id, todo.completed)}
      >
        {todo.completed ? 'to do' : 'to done'}
      </button>
    </td>
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
        className="button button__remove"
        onClick={() => removeTodo(todo.id)}
      >
        remove
      </button>
    </td>
  </>
);
