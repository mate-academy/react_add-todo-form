import React from 'react';
import classNames from 'classnames';
import users from '../api/users';
import { Todo } from '../types/Todo';

type Props = {
  todos: Todo[],
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <ul className="App__list">
    {todos.map(todo => {
      const newUser = users.find(user => user.id === todo.userId);

      return (
        <li
          key={todo.id}
          className={classNames({ 'list__item': true, 'list__item--done': todo.completed })}
        >
          {newUser?.name}
          <br />
          {todo.title}
          <br />
          {todo.completed ? 'Done' : 'Not done'}
        </li>
      );
    })}
  </ul>
);
