import React from 'react';
import { Todo } from '../types/Todo';
import './TodoList.scss';
import { TodoItem } from './TodoItem';

type Props = {
  todos: Todo[],
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <ul>
    {todos.map(todo => (
      <div className="todo_item">
        <li key={todo.id}>
          {todo.user
            ? (
              <TodoItem
                userName={todo.user.name}
                userEmail={todo.user.email}
                title={todo.title}
                completed={todo.completed}
              />
            )
            : (
              null
            )}
        </li>
      </div>
    ))}
  </ul>
);
