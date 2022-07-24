import React from 'react';
import { TodoInfo } from '../TodoInfo/TodoInfo';
import { UserInfo } from '../UserInfo/UserInfo';

interface Todo {
  id: number,
  title: string,
  completed: boolean,
  userId: number,
  user?: User | null,
}

interface User {
  id: number,
  name: string,
  username: string,
  email: string,
}

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <ul className="todo__list">
    {todos.map(todo => (
      <li className="todo__item">
        <UserInfo user={todo.user} />
        <TodoInfo
          title={todo.title}
          completed={todo.completed}
        />
      </li>
    ))}
  </ul>
);
