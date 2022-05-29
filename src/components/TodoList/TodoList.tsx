import React from 'react';
import { TodoInfo } from '../TodoInfo';
import { Todos } from '../../types/Todos';

type Props = {
  todos: Todos[],
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <div className="todoList">
    {todos.map((todo) => (
      <div
        className="todoItem"
        key={todo.id}
      >
        <TodoInfo
          todo={todo}
        />
      </div>
    ))}
  </div>
);
