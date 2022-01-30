import React from 'react';
import './TodoList/TodoList.scss';

type Props = {
  todos: Todo[]
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <ul>
    {todos.map(todo => (
      <li className="box" key={todo.id}>
        <h4>{todo.title}</h4>
        <p>{`id: ${todo.id}`}</p>
        <p>{`UserId: ${todo.userId}`}</p>
      </li>
    ))}
  </ul>
);
