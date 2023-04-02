import React from 'react';
import { TodoInfo } from '../TodoInfo';
import usersFromServer from '../../api/users';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo';

export function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

type TodoListProps = {
  todos: Todo[];
};

export const TodoList: React.FC<TodoListProps> = ({ todos }) => (
  <section className="TodoList">
    {todos.map(todo => (
      <article
        className={`TodoInfo data-id=${todo.id} ${todo.completed && 'TodoInfo--completed'}`}
        key={todo.id}
      >
        <TodoInfo todo={todo} />
        <UserInfo todo={todo} />
      </article>
    ))}
  </section>
);
