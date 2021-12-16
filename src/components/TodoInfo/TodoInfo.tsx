import React from 'react';
import classNames from 'classnames';

import { UserInfo } from '../UserInfo/UserInfo';

import { Todo } from '../../types/todo';

type Props = {
  todo: Todo,
  handleChecked: (id:number) => void,
};

export const TodoInfo: React.FC<Props> = ({ todo, handleChecked }) => {
  return (
    <>
      <div className="todoItem__block">
        <div className="todoItem__wrap">
          <div className="todoItem__content">{todo.title}</div>
        </div>
        <div>
          <input
            className="todoItem__check"
            type="checkbox"
            checked={todo.completed}
            onChange={() => handleChecked(todo.id)}
          />
          <div className={classNames(
            'todoItem__status',
            {
              todoItem__status__completed: todo.completed,
            },
          )}
          >
            {todo.completed ? 'Completed' : 'Not completed'}
          </div>
        </div>
      </div>
      {todo.user && <UserInfo user={todo.user} />}
    </>
  );
};
