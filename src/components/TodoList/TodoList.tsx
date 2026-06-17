import React from 'react';
import { TodoInfo, Todo } from '../TodoInfo/TodoInfo';

interface Prop {
  items?: Todo[];
  todos?: Todo[];
}

export const TodoList: React.FC<Prop> = ({ items = [], todos = [] }) => {
  const finalTodos = items.length > 0 ? items : todos;

  return (
    <section className="TodoList">
      {finalTodos.map(todoItem => (
        <TodoInfo todo={todoItem} key={todoItem.id} />
      ))}
    </section>
  );
};
