import React from 'react';
import { TodoInfo } from '../TodoInfo/TodoInfo';
import { Todo } from '../../types/todo';

export interface Props {
  todos: Todo[];
}

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo todo={todo} key={todo.id} />
      ))}
    </section>
  );
};
