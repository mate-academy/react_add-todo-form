import React from 'react';
import { TodoInfo } from '../TodoInfo/TodoInfo';
import type { Todo } from '../../api/types';

interface TodoListProps {
  todos: Todo[];
}

export const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  return (
    <div className="TodoList" data-cy="todoList">
      {todos.map(todo => (
        <TodoInfo key={todo.id} todo={todo} />
      ))}
    </div>
  );
};
