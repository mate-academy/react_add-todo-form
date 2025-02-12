import React, { useState } from 'react';
import { TodoInfo } from '../TodoInfo';

// import usersFromServer from '../../api/users';
import todosFromServer from '../../api/todos';

export const TodoList = () => {
  const [todos, setTodos] = useState(todosFromServer);

  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo key={todos.id} todo={todo} />
      ))}
    </section>
  );
};
