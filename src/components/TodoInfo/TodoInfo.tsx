import React from 'react';
import classNames from 'classnames';
// import { UserInfo } from '../UserInfo/UserInfo';

import { Todo } from '../../types/todo';
import { UserInfo } from '../UserInfo/UserInfo';
import './TodoInfo.scss';

type Props = {
  todo: Todo;
  handleChecked: (id:number) => void
};

export const TodoInfo:React.FC<Props> = ({ todo, handleChecked }) => {
  return (
    <>
      <div className="item__info">
        {todo.user && <UserInfo user={todo.user} />}
        <div className="item__title">{todo.title}</div>
        <input
          className="item__checkbox"
          type="checkbox"
          checked={todo.completed}
          onChange={() => handleChecked(todo.id)}
        />
        <div className={classNames(
          'item__status',
          { item__status__completed: todo.completed },
        )}
        >
          {todo.completed ? ('Сделано') : ('Не сделано')}
        </div>
      </div>
    </>
  );
};
