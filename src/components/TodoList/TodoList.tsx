import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo/TodoInfo';
import React from 'react';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      <div className="todos">
        {todos.map(todo => (
          <TodoInfo todo={todo} key={todo.id} />
        ))}
      </div>
    </section>
  );
};
