import React from 'react';

import './TodoList.scss';

import { Todo } from '../../types/Todo';

import { UserInfo } from '../UserInfo/UserInfo';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <div className="todoList">
      <ul className="todoList__list">
        {todos.map((todo) => {
          return (
            <li className="todoList__item" key={todo.id}>
              <TodoInfo todo={todo} />
              {todo.user && (
                <UserInfo user={todo.user} />
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
