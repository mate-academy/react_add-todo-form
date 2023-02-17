import React from 'react';
import { TodoInfo } from '../TodoInfo';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

type Props = {
  todos: Todo[];
  users: User[];
};

export const TodoList: React.FC<Props> = ({ todos, users }) => {
  return (
    <section className="TodoList">
      {todos.map(
        todo => (
          <TodoInfo
            todo={todo}
            user={users.find(user => todo.userId === user.id) || users[0]}
          />
        ),
      )}
    </section>
  );
};
