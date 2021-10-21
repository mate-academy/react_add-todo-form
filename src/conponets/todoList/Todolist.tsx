import React from 'react';

import { UserInfo } from '../userInfo/userInfo';
import { TodoInfo } from '../todoInfo/todoInfo';

import { PrepearedTodoTypes } from '../../types/PrepearedTodoTypes';

import './TodoList.scss';

type Props = {
  todoLists: PrepearedTodoTypes[]
};

export const TodoList: React.FC<Props> = ({ todoLists }) => (
  <ul className="todo-list">
    {todoLists.map((todoListItem) => (
      todoListItem.user
      && (
        <li
          className={
            todoListItem.completed
              ? 'todo-list__item todo-list__item--active'
              : 'todo-list__item'
          }
          key={todoListItem.id}
        >
          <UserInfo
            user={todoListItem.user}
          />
          <TodoInfo
            todoInfoList={todoListItem}
          />
        </li>
      )
    ))}
  </ul>
);
