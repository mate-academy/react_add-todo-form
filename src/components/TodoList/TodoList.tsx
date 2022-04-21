import React from 'react';
import { Todo } from '../Types/Types';
import { UserInfo } from '../UserInfo/UserInfo';
import { TodoInfo } from '../TodoInfo/TodoInfo';
import './TodoList.css';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <ul className="todoList">
    {todos.map(item => (
      <li key={item.id}>
        <div className="todoItem">
          <TodoInfo todo={item} />
          {item.user && <UserInfo user={item.user} />}
        </div>
      </li>
    ))}
  </ul>
);
