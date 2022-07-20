import React from 'react';
import { Todo } from '../../types/todo';
import { TodoInfo } from '../TodoInfo/TodoInfo';
import { UserInfo } from '../UserInfo/UserInfo';
import './TodoList.css';

type Props = {
  list: Todo[],
};

export const TodoList: React.FC<Props> = ({ list }) => (
  <ul className="preparedTodos_list">
    {list.map(todo => (
      <div className="item" key={todo.id}>
        <li className="user__item">
          <UserInfo
            userId={todo.userId}
          />
        </li>

        <li className="todo__item">
          <TodoInfo
            todo={todo}
          />
        </li>
      </div>
    ))}
  </ul>
);
