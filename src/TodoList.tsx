import React from 'react';
import { TodoItem } from './TodoItem';
import { Todo } from './types';

interface Props {
  todos: Todo[];
}

export const TodoList: React.FC<Props> = ({ todos }) => {
  // eslint-disable-next-line no-console
  console.log('todos', todos);

  return (
    <div className="movies">
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
};
