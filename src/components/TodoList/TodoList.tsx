import React from 'react';
import { Todo } from '../../Types/Todo';
import { TodoInfo } from '../TodoInfo';

type List = {
  todos: Todo[];
};

export const TodoList: React.FC<List> = ({ todos }) => (
  <section className="TodoList">
    {todos.map((todo) => (
      <TodoInfo
        key={todo.id}
        todo={todo}
      />
    ))}
  </section>
);
