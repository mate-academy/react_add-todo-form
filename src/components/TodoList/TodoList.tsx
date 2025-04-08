import React from 'react';
import { TodoInfo } from '../TodoInfo';
import { TodoInfoProps } from '../TodoInfo/TodoInfo';

interface TodoListProps {
  todos: TodoInfoProps['todo'][];
}

export const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(item => (
        <TodoInfo key={item.id} todo={item} />
      ))}
    </section>
  );
};
