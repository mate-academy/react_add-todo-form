import React from 'react';
import { TodoInfo } from '../TodoInfo/TodoInfo';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <ul>
    {todos.map(todo => {
      return (
        <li key={todo.id}>
          <TodoInfo {...todo} />
        </li>
      );
    })}
  </ul>
);
