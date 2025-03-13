import React from 'react';
import { TodoInfo } from '../TodoInfo';
import { Todo } from '../../type/Todo';
// import { todos } from './TodoList';

interface Props {
  todos: Todo[];
}

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section>
      {todos.map(
        (todo: Todo) => todo && <TodoInfo key={todo.id} todo={todo} />,
      )}
    </section>
  );
};
