import React from 'react';
import { ToDo } from '../../types/todo';
import { TodoInfo } from '../TodoInfo/TodoInfo';
import { UserInfo } from '../UserInfo/UserInfo';

type Props = {
  preparedTodos: ToDo[],
};

export const TodoList: React.FC<Props> = ({ preparedTodos }) => (
  <ul className="todos">
    {preparedTodos.map(toDo => (
      <li
        key={toDo.id}
        className={`todos__item ${toDo.completed ? 'todos__item--completed' : 'todos__item--not_completed'}`}
      >
        <TodoInfo
          todo={toDo}
        />
        <UserInfo user={toDo.user} />
      </li>
    ))}
  </ul>
);
