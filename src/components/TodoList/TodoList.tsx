import React from 'react';
import { TodoInfo } from '../TodoInfo';
import { TodoForRender } from '../types/Todo';

type Props = {
  todos: TodoForRender[],
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo {...todo} key={todo.id} />
      ))}
    </section>
  );
};

export default React.memo(TodoList);
