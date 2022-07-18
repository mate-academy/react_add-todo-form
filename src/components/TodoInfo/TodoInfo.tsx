import React from 'react';
import { Todo } from '../types/Todo';
import UserInfo from '../UserInfo/UserInfo';
import './TodoInfo.scss';

export type Props = {
  todo: Todo,
};

const TodoInfo: React.FC<Props> = ({ todo }) => (
  <div className="todo">

    <div className="todo__status" data-cy="status">
      <h3 className="todo__task">Task:</h3>
      {todo.completed
        ? (
          <div className="todo__status-item todo__status-item--complited">
            complited
          </div>
        )
        : (<div className="todo__status-item">In progress</div>)}
    </div>

    <h2 className="todo__title" data-cy="title">
      {todo.title}
    </h2>
    <div>
      <UserInfo user={todo.user} />
    </div>
  </div>
);

export default TodoInfo;
