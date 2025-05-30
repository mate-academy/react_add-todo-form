import React from 'react';

import { TodoInfo } from '../TodoInfo';
import { TodoWithUser } from '../../entities/TodoWithUser';

interface TodoListProps {
  todos: TodoWithUser[];
}

export const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => {
        return <TodoInfo key={todo.id} todo={todo} />;
      })}
    </section>
  );
};
