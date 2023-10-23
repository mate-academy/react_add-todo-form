import React from 'react';
import { TodoInfo } from '../TodoInfo';
import { TodoUser } from '../../types/ToDoInfo';

type Props = {
  todos: TodoUser[],
};
export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map((todo) => (
        <TodoInfo todo={todo} key={todo.id} />
      ))}
    </section>
  );
};
