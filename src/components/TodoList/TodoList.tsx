import React from 'react';
import { Todo } from '../../interfaces/todo';
import { TodoInfo } from '../TodoInfo/TodoInfo';

interface Props {
  todos: Todo[],
}

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => {
        return (
          <TodoInfo todo={todo} key={todo.id} data-id={todo.id} />
        );
      })}
    </section>
  );
};
