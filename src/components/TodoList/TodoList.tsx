// import { Todo } from '../Types/ToDo';
import React from 'react';
import { TodoInfo } from '../TodoInfo';
import { TodoAggregate } from '../../types/todoAggregate';

export type ListProps = {
  todos: TodoAggregate[];
};

export const TodoList: React.FC<ListProps> = ({ todos }) => (
  <section className="TodoList">
    {todos.map(todo => (
      <TodoInfo todo={todo} key={todo.id} />
    ))}
  </section>
);
