import React from 'react';
import users from '../api/users';

type Props = {
  todos: Todo[];
};

export const TodoList:React.FC<Props> = (props) => (
  <ul>
    {props.todos.map((todo) => {
      const currentUser = users.find(user => user.id === todo.userId);

      return (
        <li key={todo.id}>
          {todo.title}
          {' -- '}
          {currentUser && currentUser.name}
        </li>
      );
    })}
  </ul>
);
