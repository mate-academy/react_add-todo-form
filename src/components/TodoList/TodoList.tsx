import React from 'react';
import { PreparedTodo } from '../../types/PreparedTodo';
import { TodoInfo } from '../TodoInfo/TodoInfo';

import './TodoList.scss';

type Props = {
  todos: PreparedTodo[],
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <div className="todos">
    <ul className="todos__list">
      {todos.map(todo => (
        <li key={todo.id} className="todos__item">
          <TodoInfo
            title={todo.title}
            completed={todo.completed}
            user={todo.user}
          />
        </li>
      ))}
    </ul>
  </div>
);
