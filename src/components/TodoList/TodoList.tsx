import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo/TodoInfo';
import './TodoList.scss';

type Props = {
  Todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ Todos = [] }) => (
  <ul className="TodoList">
    {Todos.map(todo => (
      <li key={todo.id} className="TodoList__item">
        <TodoInfo
          title={todo.title}
          completed={todo.completed}
          user={todo.user}
        />
      </li>
    ))}
  </ul>
);
