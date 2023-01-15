import './App.scss';
import React, { useState } from 'react';
import { TodoList } from './components/TodoList';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { ExtendedTodo, Todo } from './types/todo';
import { User } from './types/user';

const extendTodo = (
  todos: Todo[],
  users: User[],
): ExtendedTodo[] => {
  return todos.map(todo => ({
    ...todo,
    user: users.find(user => user.id === todo.userId) || null,
  }));
};

const extendedTodo = extendTodo(
  todosFromServer,
  usersFromServer,
);

const getTodoId = (todos: ExtendedTodo[]) => {
  return Math.max(...todos.map(todo => todo.id)) + 1;
};

const getUserById = (users: User[], userId: number) => {
  return users.find(user => user.id === userId) || null;
};

export const App:React.FC = () => {
  const [todos, setTodos] = useState<ExtendedTodo[]>(extendedTodo);
  const [title, setTitle] = useState('');
  const [selectedUser, setUser] = useState(0);
  const [noUserError, setNoUser] = useState(false);
  const [noTitleError, setNoTitle] = useState(false);

  const addTodo = (todo: ExtendedTodo) => {
    setTodos(prevTodos => [...prevTodos, todo]);
  };

  const resetForm = () => {
    setTitle('');
    setUser(0);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const trimTitle = title.trim();

    setNoTitle(!trimTitle);
    setNoUser(!selectedUser);

    if (!trimTitle || !selectedUser) {
      return;
    }

    if (!noUserError && !noTitleError) {
      addTodo({
        id: getTodoId(todos),
        title,
        userId: selectedUser,
        completed: false,
        user: getUserById(usersFromServer, selectedUser),
      });

      resetForm();
    }
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setNoTitle(false);
  };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUser(+event.target.value);
    setNoUser(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        method="POST"
        onSubmit={handleSubmit}
      >
        <label className="field">
          {'Title: '}
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleInput}
          />
        </label>

        {noTitleError
          && (<span className="error">Please enter a title</span>)}

        <div className="field">
          {'User: '}
          <select
            data-cy="userSelect"
            value={selectedUser}
            onChange={handleSelect}
          >
            <option value="0" disabled>Choose a user</option>

            {usersFromServer.map(user => {
              const { id, name } = user;

              return (
                <option
                  key={id}
                  value={id}
                >
                  {name}

                </option>
              );
            })}
          </select>

          {noUserError
          && (<span className="error">Please choose a user</span>)}

        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
