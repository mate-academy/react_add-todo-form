import React from 'react';
import { Todo } from '../../api/todos';
import { TodoInfo } from '../TodoInfo';
import { User } from '../UserInfo';

interface TodoListProps {
  todos: Todo[];
  getUserById: (userId: number) => User | null;
}

const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  return (
    <div className="TodoList">
      {todos.map(todo => (
        <TodoInfo key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

export default TodoList;
