import React from 'react';
import { TodoListProps } from '../../typedefs';
import TodoInfo from '../TodoInfo/TodoInfo';

const TodoList: React.FC<TodoListProps> = ({ todos }) => (
  <section className="TodoList">
    {todos.map((todo) => (
      <TodoInfo key={todo.id} todo={todo} />
    ))}
  </section>
);

export default TodoList;
