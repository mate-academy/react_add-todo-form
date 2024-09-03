import React from 'react';
import { TodoInfo } from '../TodoInfo';
import { Todo } from '../../types/ToDo';

type TodoListProps = {
  todos: Todo[];
};

export const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(itemToDo => (
        <article key={itemToDo.id} data-id={itemToDo.id}>
          <TodoInfo todo={itemToDo} />
        </article>
      ))}
    </section>
  );
};
