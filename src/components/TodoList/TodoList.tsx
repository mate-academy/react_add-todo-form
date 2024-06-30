import React from 'react';
import { TodoItem } from '../../types/TodoItems';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: TodoItem[];
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <section className="TodoList">
    {todos.map((item: TodoItem) => (
      <TodoInfo todo={item} key={item.id} />
    ))}
  </section>
);
