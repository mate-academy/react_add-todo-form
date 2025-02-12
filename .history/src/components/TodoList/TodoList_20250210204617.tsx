import React, { useState } from 'react';
import { TodoInfo } from '../TodoInfo';

// import usersFromServer from '../../api/users';

type Props = {
  todos: {
    id: number;
    title: string;
    completed: boolean;
    userId: number;
  }[];
};

export const TodoList: React.FC<Props> = ({ todo }) => {
  const [todos, setTodos] = useState(todo);

  return (
    <section className="TodoList">
      {todo.map(todo => (
        <TodoInfo key={todos.id} todo={todo} />
      ))}
    </section>
  );
};
