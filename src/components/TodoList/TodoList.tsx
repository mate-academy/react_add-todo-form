import React from 'react';
import { TodoInfo } from '../TodoInfo/TodoInfo';
import { Todo } from '../../types';

interface TodoListProps {
  todos: Todo[];
}

export const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  return (
    <div>
      {todos.map(todo => {
        return <TodoInfo key={todo.id} todo={todo} />;
      })}
    </div>
  );
};
