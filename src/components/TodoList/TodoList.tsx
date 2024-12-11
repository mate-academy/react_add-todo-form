import React from 'react';
import { TodoInfo } from '../TodoInfo';
import { ToDo } from '../../props/TODO';

type ToDosProps = {
  todos: ToDo[];
};

export const TodoList: React.FC<ToDosProps> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
