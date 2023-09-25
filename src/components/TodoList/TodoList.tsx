import React from 'react';
import { TodoInfo, TodoItemType } from '../TodoInfo';

type TodoListProps = {
  todos: TodoItemType[];
};

export const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map((todo) => (
        <TodoInfo key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
