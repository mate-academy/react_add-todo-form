import React from 'react';
import { TodoInfo } from '../TodoInfo';
import { TodoWithUser } from '../../types/TodoWithUserTypes';

type Props = {
  todos: TodoWithUser[]
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => <TodoInfo todo={todo} />)}
    </section>
  );
};
