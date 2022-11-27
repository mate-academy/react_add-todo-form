import React from 'react';
import { TodoInfo } from '../TodoInfo';

export const TodoList: React.FC<TodosItems> = ({ todosItems }) => {
  return (
    <section className="TodoList">
      {todosItems.map(todo => (
        <TodoInfo {...todo} key={todo.id} />
      ))}
    </section>
  );
};
