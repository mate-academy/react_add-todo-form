import React from 'react';
import { UserInfo } from '../UserInfo/UserInfo';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => (
  <>
    <h2 className="todo__title">{todo.title}</h2>
    <span>{todo.user && (<UserInfo user={todo.user} />)}</span>
    <br />
    <span className="todo__status">
      {todo.completed
        ? <div className="todo__list--completed">Completed</div>
        : <div className="todo__list--not-completed">Not completed</div>}
    </span>
  </>
);
