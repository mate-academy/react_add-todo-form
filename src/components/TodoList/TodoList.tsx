import React from 'react';
import { TodoInfo } from '../TodoInfo';
import { TodoWithUser } from '../../App';

export const TodoList: React.FC<{ todos: TodoWithUser[] }> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <React.Fragment key={todo.id}>
          <TodoInfo todo={todo} key={todo.id} />
        </React.Fragment>
      ))}
    </section>
  );
};
