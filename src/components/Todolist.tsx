import React from 'react';
import users from '../api/users';
import { Todo } from '../types/Todo';
import './todo.scss';

type Props = {
  todos : Todo[];
};

const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <ul className="todo">
      {todos.map(todo => {
        const newUser = users.find(user => user.id === todo.userId);

        return (
          <li
            key={todo.id}
            className="todo__item"
          >
            <div>
              <b>{newUser?.name}</b>
              <br />
              {newUser?.email}
              <br />
              {todo.title}
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default TodoList;
