import React from 'react';
import { TodoInfo } from '../TodoInfo';
import { Todo, User } from '../../App';

interface TodoWithUser extends Todo {
  users?: User;
}

interface TodoListProps {
  todos: TodoWithUser[];
}

export const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
