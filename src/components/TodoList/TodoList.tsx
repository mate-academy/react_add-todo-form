import React from 'react';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { TodoInfo } from '../TodoInfo/TodoInfo';
import { UserInfo } from '../UserInfo/UserInfo';

interface Props {
  todos: Todo[];
  users: User[];
}

export const TodoList: React.FC<Props> = ({ todos, users }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => {
        const user = users.find(user => user.id === todo.userId);

        return (
          <article
            key={todo.id}
            data-id={todo.id}
            className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
          >
            <TodoInfo todo={todo} />
            {user && <UserInfo user={user} />}
          </article>
        );
      })}
    </section>
  );
};
