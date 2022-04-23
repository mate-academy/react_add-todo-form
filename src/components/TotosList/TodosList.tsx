import React from 'react';
import './TodosList.css';
import { Todo } from '../types';
import { TodoInfo } from '../Todo/Todo';

type Props = {
  todos: Todo[];
};

export const TodosList: React.FC<Props> = ({ todos }) => {
  return (
    <ul className="todos__list">
      <li className="todos__item todos__item__title">
        <div className="todo__text">Todo</div>
        <div className="todo__text todo__completed">Done</div>
        <div className="todo__text">User</div>
      </li>
      {todos.map(todo => (
        <li key={todo.id} className="todos__item">
          <TodoInfo {...todo} />
        </li>
      ))}
    </ul>
  );
};
