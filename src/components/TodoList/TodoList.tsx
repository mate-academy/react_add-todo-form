import React from 'react';
import { TodoInfo } from '../TodoInfo';
import { TodoWithUser } from '../../react-app-env';

type Props = {
  todos: TodoWithUser[]
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <React.Fragment key={todo.id}>
          <TodoInfo
            todo={todo}
          />
        </React.Fragment>
      ))}
    </section>
  );
};
