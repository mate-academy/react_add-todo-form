import React from 'react';
import { Todo } from '../../types/Todo';
import usersFromServer from '../../api/users';
import { TodoInfo } from '../TodoInfo';

interface Props {
  todos: Todo[];
}

export const TodoList: React.FC<Props> = ({ todos }) => {
  const preparedTodos = todos.map(todo => {
    const user = usersFromServer.find(item => item.id === todo.userId) || null;

    return {
      ...todo,
      user,
    };
  });

  return (
    <section className="TodoList">
      {preparedTodos.map(todo => (
        <TodoInfo key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
