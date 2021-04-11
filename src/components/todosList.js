import React from 'react';
import { arrayOf, number, shape, string } from 'prop-types';
import { Todo } from './todo';

export const TodoList = ({ todos, users }) => (
  <ul className="TodoList">
    {todos.map((todo, i) => (
      <li
        key={`todo${todo.id}`}
      >
        <Todo
          title={todo.title}
          userName={users.find(user => (
            user.id === todo.userId
          )).name}
          id={todo.id}
        />
      </li>
    ))}
  </ul>
);

TodoList.propTypes = {
  todos: arrayOf(shape({
    userId: number.isRequired,
    title: string.isRequired,
  })).isRequired,
  users: arrayOf(shape({
    username: string.isRequired,
    id: number.isRequired,
    email: string.isRequired,
  })).isRequired,
};
