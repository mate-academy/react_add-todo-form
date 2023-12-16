import React from 'react';
import Todo from '../../types/Todo';
import { TodoInfo } from '../TodoInfo';

interface Props {
  todos: Todo[];
}

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="section box TodoList">
      <h2 className="title">Todos</h2>
      {todos.map(todo => <TodoInfo key={todo.id} todo={todo} />)}
    </section>
  );
};
