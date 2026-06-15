import React from 'react';
import { TodoInfo } from '../TodoInfo';
import { Todo } from '../../App';

interface Props {
  todos: Todo[];
}

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(currentTodo => (
        <TodoInfo key={currentTodo.id} todo={currentTodo} />
      ))}
    </section>
  );
};
