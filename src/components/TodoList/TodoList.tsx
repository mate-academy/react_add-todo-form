import { TodoInfo } from '../TodoInfo';
import { Todo } from '../../types/Todo';
import React from 'react';

type Props = {
  todos: Todo[];
};

// Add the required types and props
export const TodoList: React.FC<Props> = ({ todos }) => (
  <>
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo data-id={todo.id} key={todo.id} todo={todo} />
      ))}
    </section>
  </>
);
