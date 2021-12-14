import React from 'react';
import classNames from 'classnames';

// components
import { UserInfo } from '../UserInfo/UserInfo';

// types
import { Todo } from '../../types/todo';
import './TodoInfo.scss';

type Props = {
  todo: Todo;
  handleChecked: (id:number) => void
};

export const TodoInfo:React.FC<Props> = ({ todo, handleChecked }) => {
  return (
    <>
      <div className="todoItem__block">
        <div className="todoItem__wrap">
          <div className="todoItem__assignment">{todo.title}</div>
          <input
            className="todoItem__checkbox"
            type="checkbox"
            checked={todo.completed}
            // eslint-disable-next-line no-console
            onChange={() => handleChecked(todo.id)}
          />
        </div>
        <div className={classNames(
          'todoItem__status',
          {
            todoItem__status__completed: todo.completed,
          },
        )}
        >
          {todo.completed ? ('Completed') : ('Not completed')}
        </div>
      </div>
      {todo.user && <UserInfo user={todo.user} />}
    </>
  );
};
