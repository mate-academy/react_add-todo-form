import React from 'react';
import './Todo.css';
import { Todo } from '../types';

type Props = Todo;

export const TodoInfo: React.FC<Props> = ({
  title,
  completed,
  user,
}) => (
  <>
    <div className="todo__title">{title}</div>
    <div className="todo__completed">{`${completed}`}</div>
    <div className="todo__user">{`${user && user.name}`}</div>
  </>
);
