import React from 'react';
import { TodoInfo } from '../TodoInfo/TodoInfo';
import { UserInfo } from '../UserInfo/UserInfo';

type Props = {
  todoList: Todo[]
};

export const TodoList: React.FC<Props> = ({ todoList }) => (
  <ul className="list">
    {todoList.map(todo => (
      <li className="list__item" key={todo.id}>
        <UserInfo user={todo.user} />
        <TodoInfo
          title={todo.title}
          completed={todo.completed}
        />
      </li>
    ))}
  </ul>
);
