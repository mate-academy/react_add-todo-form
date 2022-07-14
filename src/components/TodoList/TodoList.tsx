import React from 'react';
import './TodoList.scss';
import { PreparedTodo } from '../../types/PreparedTodo';
import { TodoInfo } from '../TodoInfo/TodoInfo';
import { UserInfo } from '../UserInfo/UserInfo';

type Props = {
  todos: PreparedTodo[]
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <li className="todo-list__item" key={todo.id}>
          {todo.user && (
            <UserInfo user={todo.user} />
          )}
          <hr className="todo-list__divider" />
          <TodoInfo todo={todo} />
        </li>
      ))}
    </ul>
  );
};
