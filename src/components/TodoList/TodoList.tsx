import React from 'react';
import { Todo } from '../../Types/todo';
import { TodoInfo } from '../TodoInfo';

interface Prop {
  todos: Todo[];
}

export const TodoList: React.FC<Prop> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => {
        return <TodoInfo key={todo.id} todo={todo} />;
      })}
    </section>
  );
};
