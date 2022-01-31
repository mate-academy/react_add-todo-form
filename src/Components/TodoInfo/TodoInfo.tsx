import React from 'react';
import { UserInfo } from '../UserInfo/UserInfo';
import './TodoInfo.scss';

export const TodoInfo: React.FC<Todo> = ({ title, completed, user }) => (
  <>
    <p className="todo-title">{`${title} - ${completed ? 'completed' : 'uncompleted'}`}</p>
    <p>{user && <UserInfo {...user} />}</p>
  </>

);
