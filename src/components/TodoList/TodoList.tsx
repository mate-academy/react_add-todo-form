import React from 'react';
import { TodoItem } from '../../types/todoItem';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: TodoItem[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(item => (
        <TodoInfo key={item.id} todo={item} />
      ))}
    </section>
  );
};
