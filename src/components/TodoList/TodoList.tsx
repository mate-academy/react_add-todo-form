import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo';
import './TodoList.scss';

type Props = {
  prepTodos: Todo[];
};

export const TodoList: React.FC<Props> = ({ prepTodos }) => (
  <ul className="todo__list">
    {
      prepTodos.map((todo) => (
        <li className="todo__list-item" key={todo.id}>
          <TodoInfo
            todo={todo}
          />
        </li>
      ))
    }
  </ul>
);
