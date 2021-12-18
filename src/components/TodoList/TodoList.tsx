import React from 'react';
import TodoInfo from '../TodoInfo';
import { Todo } from '../types/Todo';

import './TodoList.scss';

interface Props {
  todos: Todo[];
  handleChecked: (id: number) => void;
}

export const TodoList: React.FC<Props> = ({ todos, handleChecked }) => (
  <div className="TodoList">
    <ul className="TodoList__list">
      {todos.map(todo => (
        <li className="TodoList__item" key={todo.id}>
          <TodoInfo
            title={todo.title}
            completed={todo.completed}
            user={todo.user}
            id={todo.id}
            handleChecked={handleChecked}
          />
        </li>
      ))}
    </ul>
  </div>
);
