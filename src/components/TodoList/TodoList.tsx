import React from 'react';
import { Todo } from '../../react-app-env';
import { TodoInfo } from '../TodoInfo/TodoInfo';
import { UserInfo } from '../UserInfo/UserInfo';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <ul className="block">
    {todos.map(todo => (
      <li key={todo.id} className="box">
        <TodoInfo
          title={todo.title}
          isCompleted={todo.completed}
        />
        <UserInfo user={todo.user} />
      </li>
    ))}
  </ul>
);
