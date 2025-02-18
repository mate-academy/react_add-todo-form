import React from 'react';
import { TodoInfo } from '../TodoInfo';
import { Todo } from '../../intefaces/Todo';
import { User } from '../../intefaces/User';

interface TodoListProps {
  todos: Todo[];
  users?: User[];
}

export const TodoList: React.FC<TodoListProps> = ({ todos, users }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => {
        const user =
          users && users.find(eachUser => eachUser.id === todo.userId);

        const todoWithUser = {
          ...todo,
          user: user ? user : { id: -1, name: '', username: '', email: '' },
        };

        return <TodoInfo key={todo.id} todo={todoWithUser} />;
      })}
    </section>
  );
};
