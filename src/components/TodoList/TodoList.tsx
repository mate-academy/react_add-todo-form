import React from 'react';
import { PreparedTodo } from '../../type/preparedtodo';
import { TodoInfo } from '../TodoInfo/TodoInfo';
import { UserInfo } from '../UserInfo/UserInfo';
import './TodoList.scss';

type Props = {
  todos: PreparedTodo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <ul className="todo">
    {todos.map(todo => {
      return (
        <li key={todo.id} className="todo--item">
          <TodoInfo todo={todo} />
          {todo.user && (
            <span>
              {' - '}
            </span>
          )}
          <UserInfo user={todo?.user} />
        </li>
      );
    })}
  </ul>
);
