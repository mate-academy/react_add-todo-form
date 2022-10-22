import React from 'react';
import { TodoInfo } from '../TodoInfo/index';
import { Todo } from '../../interface/Todo';

type Props = {
  todos: Todo[],
};

export const TodoList:React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo todo={todo} />
      ))}
    </section>
  );
};
