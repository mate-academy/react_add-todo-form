import React from 'react';
import { PreparedTodo } from '../../react-app-env';
import { TodoInfo } from '../TodoInfo/TodoInfo';

type Props = {
  preparedTodos: PreparedTodo[];
};

export const TodoList: React.FC<Props> = ({ preparedTodos }) => (
  <ol className="todoList">
    {preparedTodos.map(preparedTodo => (
      <li key={preparedTodo.id} className="todoItem">
        <TodoInfo preparedTodo={preparedTodo} />
      </li>
    ))}
  </ol>
);
