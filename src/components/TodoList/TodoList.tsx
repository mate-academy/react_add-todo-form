import { UserInfo } from '../UserInfo';
import React from 'react';
import { Todos } from '../../types/Types';

type TodoListState = {
  todos: Todos[];
};

export const TodoList: React.FC<TodoListState> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <UserInfo key={todo.id} todos={todo} />
      ))}
    </section>
  );
};
