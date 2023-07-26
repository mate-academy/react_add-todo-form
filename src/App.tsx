import './App.scss';
import React, { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { UserInfo } from './components/UserInfo';
import { Todo } from './components/types';
import { TodoList } from './components/TodoList';
import { TodoInfo } from './components/TodoInfo';

export const App = () => {
  const [todos, setTodos] = useState(todosFromServer);
  const [title, setTitle] = useState<string>('');
  const [errorTitle, setErrorTitle] = useState(false);
  const [user, setUser] = useState(0);
  const [errorUser, setErrorUser] = useState(false);

  const resetInputs = () => {
    setTitle('');
    setUser(0);

    setErrorTitle(false);
    setErrorUser(false);
  };

  const maxTodoIndex = (arr: Todo[]) => {
    const max = Math.max(...arr.map(todo => todo.id));

    return max + 1;
  };

  const onAddTodo = (todo: Todo) => {
    setTodos(prevTodos => [...prevTodos, todo]);
  };

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title) {
      setErrorTitle(true);
    }

    if (!user) {
      setErrorUser(true);
    }

    if (!title || !user) {
      return;
    }

    onAddTodo({
      id: maxTodoIndex(todos),
      title,
      completed: false,
      userId: user,
    });

    resetInputs();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/users" method="POST" onSubmit={onSubmitHandler}>
        <TodoInfo
          usersFromServer={usersFromServer}
          todos={todos}
        />
        <UserInfo
          users={usersFromServer}
          setUser={setUser}
          user={user}
          errorUser={errorUser}
        />

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList
        title={title}
        setTitle={setTitle}
        errorTitle={errorTitle}
      />
    </div>
  );
};
