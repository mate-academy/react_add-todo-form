import React from 'react';
import { TodoInfo } from '../TodoInfo/TodoInfo';
import { TodoWithUser } from '../../types';

type TodoListProps = {
  todos: TodoWithUser[];
};

export const TodoList = ({ todos }: TodoListProps) => {
  return (
    <section className="TodoList">
      {todos.map(currentTodo => (
        <TodoInfo key={currentTodo.id} todo={currentTodo} />
      ))}
    </section>
  );
};
