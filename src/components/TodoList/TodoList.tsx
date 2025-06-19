import React from 'react';
import { TodoInfo } from '../TodoInfo';
import { Todo } from '../../App';

type PropsList = {
  todos: Todo[];
};

export const TodoList: React.FC<PropsList> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo todo={todo} key={todo.id} />
      ))}
    </section>
  );
};
