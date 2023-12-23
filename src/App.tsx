import React, { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';
import { Todo, User, TodoAndUser } from './types/types';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function getUserById(users: User[], userId: number): User | undefined {
  return users.find(user => user.id === userId);
}

function connectUsersToTodos(
  todos: Todo[],
  users: User[],
): TodoAndUser[] {
  return todos.map(todo => {
    const { userId } = todo;
    const userById = getUserById(users, userId);

    return {
      ...todo,
      user: userById,
    };
  });
}

interface DefaultTodo {
  id: number
  title: string,
  completed: boolean
  user: User | undefined
  userId: number
}

const defaultTodo: DefaultTodo = {
  id: 0,
  title: '',
  completed: false,
  user: undefined,
  userId: 0,
};

interface Touched {
  titleTouched: boolean
  userTouched: boolean
}

const defaultTouched: Touched = {
  titleTouched: false,
  userTouched: false,
};

export const App = () => {
  const [listTodos, setListTodos]
    = useState(connectUsersToTodos(todosFromServer, usersFromServer));
  const [count, setCount] = useState(0);
  const [todo, setTodo] = useState<DefaultTodo>(defaultTodo);
  const [touched, setTouched] = useState<Touched>(defaultTouched);

  const {
    titleTouched,
    userTouched,
  } = touched;

  const {
    title,
    userId,
  } = todo;

  const handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    const { user } = todo;

    event.preventDefault();

    if (!user) {
      setTouched(currentTouched => ({
        ...currentTouched,
        userTouched: true,
      }));
    }

    if (!title.trim()) {
      setTouched(currentTouched => ({
        ...currentTouched,
        titleTouched: true,
      }));
    }

    if (!(user && title.trim())) {
      return;
    }

    setListTodos(currentListTodos => [...currentListTodos, todo]);
    setCount(cur => cur + 1);
    setTodo(defaultTodo);
  };

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setTodo(currentTodo => ({
      ...currentTodo,
      [name]: value,
      id: Math.max(...listTodos.map(todoMap => todoMap.id)) + 1,
    }));

    setTouched(currentTouched => ({
      ...currentTouched,
      [`${name}Touched`]: false,
    }));
  };

  const handleChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    const user = getUserById(usersFromServer, +value);

    setTodo(currentTodo => ({
      ...currentTodo,
      userId: +value,
      [name]: user,
    }));

    setTouched(currentTouched => ({
      ...currentTouched,
      [`${name}Touched`]: false,
    }));
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        key={count}
        onSubmit={handleSubmitForm}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            name="title"
            placeholder="Enter a title"
            value={title}
            onChange={handleChangeInput}
          />
          {titleTouched && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            name="user"
            value={userId}
            onChange={handleChangeSelect}
          >
            <option value="0" disabled>Choose a user</option>
            {
              usersFromServer.map(user => {
                const { id, name } = user;

                return (
                  <option key={id} value={id}>{name}</option>
                );
              })
            }
          </select>

          {userTouched && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={listTodos} />
    </div>
  );
};
