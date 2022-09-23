import React from 'react';
import { TodoInfo } from '../TodoInfo';
import { TodoWithPerson } from '../../type';

type Props = {
  todos: TodoWithPerson[];
};

export const TodoList: React.FC<Props> = ({
  todos,
}) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo todo={todo} key={todo.id} />
      ))}
    </section>
  );
};
