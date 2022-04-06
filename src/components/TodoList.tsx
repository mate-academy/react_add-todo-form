import React from 'react';
import { Todo } from '../types';
import { TodoInfo } from './todoInfo';

type Props = {
  todos: Todo[]
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <ul>
      {todos.map(todo => {
        return (
          <li key={todo.id}>
            <TodoInfo todo={todo} />
          </li>
        );
      })}
    </ul>
  );
};
