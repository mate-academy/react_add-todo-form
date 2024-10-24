import React from 'react';
import { TodoInfo } from '../TodoInfo';
import usersFromServer from '../../api/users';
import { Todo } from '../../App';
import { User } from '../../App';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map((todo, index) => {
        const { title, userId } = todo;
        const currentUser: User = (usersFromServer || []).find(
          user => user.id === userId,
        )!;
        const moddedTodo = { ...todo, user: currentUser };

        return <TodoInfo todo={moddedTodo} key={`${title}-${index}`} />;
      })}
    </section>
  );
};
