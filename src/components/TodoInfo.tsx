import React from 'react';
import { Todo } from '../types';
import UserInfo from './UserInfo';

type Props = {
  todo: Todo,
};

const TodoInfo: React.FC<Props> = ({ todo }) => (
  <div className="todoContainer">
    <h2 className="todoHeading">{todo.title}</h2>
    <input type="checkbox" defaultChecked={todo.completed} />
    {todo.user && <UserInfo user={todo.user} />}
  </div>
);

export default TodoInfo;
