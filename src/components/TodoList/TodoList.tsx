import React from 'react';
import { Todo } from '../../Types/Todo';
import { TodoInfo } from '../TodoInfo';

interface TodoListProps {
  todos: Todo[],
}

export const TodoList:React.FC<TodoListProps> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
