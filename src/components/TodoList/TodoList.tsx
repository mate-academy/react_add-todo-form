import React from 'react';
import { TodoInfo } from '../TodoInfo';
import { Todo, User } from '../../types';

interface TodoListProps {
  todos: Todo[];
  users: User[];
}

export const TodoList: React.FC<TodoListProps> = ({ todos, users }) => {
  return (
    <div>
      <ul>
        {todos.map(todo => (
          <TodoInfo key={todo.id} todo={todo} users={users} />
        ))}
      </ul>
    </div>
  );
};
