import React from 'react';
import { TodoInfo } from '../TodoInfo';
import { TodosWithUsers } from '../../react-app-env';

type Props = {
  todos: TodosWithUsers[];
};

export const TodoList: React.FC<Props> = ({ todos }) => (

  <section className="TodoList">
    {todos.map(todo => (
      <TodoInfo
        todo={todo}
        key={todo.id}
      />
    ))}
  </section>
);
