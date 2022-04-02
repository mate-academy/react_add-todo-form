import './App.scss';
import React, { useCallback, useState } from 'react';
import { todos as todosFromServer } from './api/todos';
import { users } from './api/users';
import { Todo } from './types/Todo';
import { PageNavbar } from './components/PageNavbar';
import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm';

function getPreparedTodos(): Todo[] {
  return [...todosFromServer].map(untypedTodo => {
    const untypedUser = users[untypedTodo.userId - 1] || null;

    return {
      user: {
        userId: untypedUser.id,
        fullName: untypedUser.name,
        username: untypedUser.username,
        email: untypedUser.email,
      },
      userId: untypedTodo.userId,
      todoId: untypedTodo.id,
      title: untypedTodo.title,
      completed: untypedTodo.completed,
    };
  });
}

export const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [todos, setTodos] = useState(getPreparedTodos);

  const handleFormSubmission = useCallback((newTodo) => {
    setTodos((prevTodos) => (
      [...prevTodos, newTodo]
    ));
  }, []);

  return (
    <div className="App">
      <PageNavbar />

      <div
        className="App__content d-flex justify-content-between"
      >
        <div className="App__form">
          <TodoForm onSubmit={handleFormSubmission} />
        </div>

        <TodoList todos={todos} />
      </div>
    </div>
  );
};
