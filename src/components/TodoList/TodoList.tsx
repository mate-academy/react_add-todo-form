import React from 'react';
import { PreparedTodo } from '../../type/preparedtodo';
import { TodoInfo } from '../TodoInfo/TodoInfo';
import { UserInfo } from '../UserInfo/UserInfo';
import './TodoList.scss';

type Props = {
  prepared: PreparedTodo[];
};

export const TodoList: React.FC<Props> = ({ prepared }) => (
  <ul className="todo">
    {prepared.map(todo => {
      return (
        <li key={todo.id} className="todo--item">
          <TodoInfo todo={todo} />
          {todo.user && (
            <span>
              {' - '}
            </span>
          )}
          <UserInfo user={todo.user} />
        </li>
      );
    })}
  </ul>
);
