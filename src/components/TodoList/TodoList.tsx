import React from 'react';
import { TodosItems } from '../../types/TodoItems';
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
