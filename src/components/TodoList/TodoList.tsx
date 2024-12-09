import React from 'react';
import { Todo } from '../../ToDO';
import { TodoInfo } from '../TodoInfo';
import { User } from '../../User';

type TodoListProps = {
  todos: Todo[];
  users: User[];
};

export const TodoList: React.FC<TodoListProps> = ({ todos, users }) => {
  return (
    <div className="TodoList">
      {todos.map(todo => (
        <TodoInfo key={todo.id} {...todo} users={users} />
      ))}
    </div>
  );
};
