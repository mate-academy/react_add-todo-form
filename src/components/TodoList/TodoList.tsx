import React from 'react';
import { TodoInfo } from '../TodoInfo';

type TodosProps = {
  todos: Todos[]
};

export const TodoList: React.FC<TodosProps> = ({ todos }) => (
  <section className="TodoList">
    <article data-id="1" className="TodoInfo TodoInfo--completed">
      <h2 className="TodoInfo__title">
        {todos.map(todo => (
          <TodoInfo todo={todo} key={todo.id} />
        ))}
      </h2>
    </article>
  </section>
);
