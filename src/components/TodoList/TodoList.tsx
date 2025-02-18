import React from 'react';
import { TodoInfo } from '../TodoInfo';
import { TodosWithUser } from '../../types/ToDosWithUser';

type Props = {
  todos: TodosWithUser[];
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <section className="TodoList">
    {todos.map(todo => (
      <TodoInfo todo={todo} key={todo.id} />
    ))}
  </section>
);
