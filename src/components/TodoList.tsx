import React from 'react';
import users from '../api/users';

type Props = {
  todos: Todo[];
};

export const TodoList:React.FC<Props> = (props) => (
  <ul>
    {props.todos.map((todo) => (
      <li key={todo.id}>
        {todo.title}
        {' -- '}
        {users[users.findIndex(user => user.id === todo.userId)].name}
      </li>
    ))}
  </ul>
);
