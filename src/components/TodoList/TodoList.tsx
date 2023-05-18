import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo';

type TodoType = {
  todos: Todo[];
};

export const TodoList:React.FC<TodoType> = ({ todos }) => (
  <>
    <section className="TodoList">
      {todos.map((todo) => (
        <TodoInfo key={todo.id} todo={todo} />
      ))}
    </section>
  </>
);
