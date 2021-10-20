import React from 'react';

import { Todo } from '../types/Todo';
import { UserInfo } from './UserInfo';
import { TodoInfo } from './TodoInfo';

type Props = {
  todoList: Todo[];
};

export const TodoList: React.FC<Props> = ({ todoList }) => {
  return (
    <ul className="todoList">
      {todoList.map(todo => (
        todo.user && (
          <li className="todoList__Item" key={todo.id}>
            <UserInfo user={todo.user} />
            <TodoInfo todo={todo} />
          </li>
        )
      ))}
    </ul>
  );
};
