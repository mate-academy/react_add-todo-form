import React from 'react';

import { PreparedTodo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo';

interface Props {
  todos: PreparedTodo[]
}

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {
        todos.map(todo => <TodoInfo todo={todo} key={todo.id} />)
      }
    </section>
  );
};
