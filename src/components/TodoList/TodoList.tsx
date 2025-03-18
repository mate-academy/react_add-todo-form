import React from 'react';
import { Todo } from '../../App';
import { TodoInfo } from '../TodoInfo/TodoInfo';

interface TodoListProps {
  todos: Todo[];
}

export const TodoList: React.FC<TodoListProps> = ({ todos }) => (
  <section className="TodoList">
    {todos.map((todo, index) => (
      <TodoInfo todo={todo} key={todo.id || index} />
    ))}
  </section>
);
