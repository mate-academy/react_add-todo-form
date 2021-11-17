import React from 'react';
import { Todo } from '../types';

interface Props {
  todos: Todo[],
}

export const TodoList: React.FC<Props> = ({ todos }) => (
  <ul>
    {
      todos.map((todo: Todo) => (
        <li className="App__list" key={Math.random()}>
          <p>
            Title:
            {' '}
            {todo.title}
          </p>

          <p>
            id:
            {' '}
            {todo.id}
          </p>

          <p>
            userId:
            {' '}
            {todo.userId}
          </p>

        </li>
      ))
    }
  </ul>
);
