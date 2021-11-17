import React from 'react';
import users from '../api/users';
import { Todo } from '../types/Todo';
import './TodoList.css';

interface Props {
  todos: Todo[],
}

export const TodoList: React.FC<Props> = (props) => {
  return (
    <ul className="list">
      {
        props.todos.map((todo) => (
          <li
            className="list__item"
            key={todo.id}
          >
            <h3>
              {todo.title}
            </h3>
            <span>
              {users.find((user) => (
                user.id === todo.userId
              ))?.name}
            </span>
          </li>
        ))
      }
    </ul>
  );
};
