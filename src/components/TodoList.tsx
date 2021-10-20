import React from 'react';
import '../App.scss';
import users from '../api/users';
import { TodoTypes } from '../types/TodoTypes';

type Props = {
  todos: TodoTypes[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <ul className="App__list">
      {todos.map(todo => {
        const newUser = users.find(user => user.id === todo.userId);

        return (
          <li
            key={todo.id}
            className="App__item"
          >
            <div className="App__info">
              {newUser?.name}
            </div>
            <div className="App__info">
              {todo.title}
            </div>
          </li>
        );
      })}
    </ul>
  );
};
