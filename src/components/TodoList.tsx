import React from 'react';
import { Todo } from '../types/Todo';
import './TodoList.scss';
import { TodoItem } from './TodoItem';

type Props = {
  todos: Todo[],
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <ul className="todo_item">
    {todos.map(todo => (
      <li key={todo.id}>
        {todo.user && (
          <TodoItem todoItem={todo} />
        )}
      </li>
    ))}
  </ul>
);
