import React from 'react';
import { Todo } from '../types';
import UserInfo from '../UserInfo/UserInfo';
import './TodoInfo.scss';

type Props = {
  todo: Todo,

};

const TodoInfo: React.FC<Props> = ({ todo }) => {
  return (
    <div className="TodoInfo">
      <div className="todoInfoTitle">
        {todo.title}
      </div>
      {todo.completed ? 'completed' : 'notCompleted'}
      <UserInfo user={todo.user} />
    </div>
  );
};

export default TodoInfo;
