import React from 'react';
import usersFromServer from '..//../api/users';
import { TodoInfo } from '../TodoInfo';
import { TodosProps } from '../../types/Todo';

export const TodoList: React.FC<{ todos: TodosProps[] }> = ({ todos }) =>
  todos.map(todo =>
    <TodoInfo
      todo={todo}
      users={usersFromServer}
      key={todo.id}
    />);
