import React from 'react';
import { Todo } from '../types/TodoType';
import { UserInfo } from './UserInfo';
import { TodoInfo } from './TodoInfo';
import users from '../api/users';

interface Props {
  todos: Todo[];
}

export const TodoList: React.FC<Props> = ({ todos }) => (
  <ul className="todo__list">
    {todos.map(aTodo => {
      return (
        <li
          className="todo"
          key={aTodo.id}
        >
          <UserInfo user={users.find(user => user.id === aTodo.userId)} />
          <TodoInfo {...aTodo} />
        </li>
      );
    })}
  </ul>
);
