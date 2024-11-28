import React from 'react';
import { Todo } from '../../Types/InterfaceTodo';
import { TodoInfo } from '../TodoInfo';

interface Props {
  todos: Todo[];
}

export const TodoList: React.FC<Props> = props => {
  const { todos } = props;

  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
