import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <ul className="TodoList">
    {
      todos.map(t => (
        <li key={t.id}>
          <TodoInfo todo={t} />
        </li>
      ))
    }
  </ul>
);
