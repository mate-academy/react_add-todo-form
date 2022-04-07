import React from 'react';
import { Todo } from '../../types/types';
import { TodoItem } from '../TodoItem/TodoItem';
import './TodoList.scss';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <div className="todo">
    <ul className="todo_list">
      {todos.map(todo => (
        <li className="todo_item" key={todo.id}>
          <TodoItem todo={todo} />
        </li>
      ))}
    </ul>
  </div>
);
