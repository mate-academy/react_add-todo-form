import React from 'react';
import { Todo } from '../../Types/Todo';
import { UserInfo } from '../UserInfo/UserInfo';
import './TodoInfo.scss';

type Props = {
  todo: Todo
};

export const TodoInfo: React.FC<Props> = ({ todo }) => (
  <div className="todo">
    <div className="todo__container">
      {todo.user && (
        <UserInfo user={todo.user} />
      )}
    </div>
    <div className="todo__container">
      <h2 className="todo__title">{`Title: ${todo.title}`}</h2>
      <p className="todo__status">
        {`Status: ${todo.completed ? 'Is done' : 'in progress'}`}
      </p>
    </div>
  </div>
);
