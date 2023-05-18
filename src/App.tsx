import React, { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';
import { Todo } from './components/TodoInfo';
import { User } from './components/UserInfo';
import users from './api/users';
import todos from './api/todos';

function getUser(userId: number): User | null {
  const foundUser = users.find(user => user.id === userId);

  return foundUser || null;
}

export const usedTodos: Todo[] = todos.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

function getMaxTodoId(tasks: Todo[]) {
  const todoIds = [];

  for (let i = 0; i < tasks.length; i += 1) {
    todoIds.push(tasks[i].id);
  }

  return todoIds.sort((task1, task2) => task2 - task1)[0];
}

export const App = () => {
  /* const [todosWithUser, setTodos] = useState<Todo[]>(() => usedTodos.map(
    todo => ({
      ...todo,
      user: users.find(user => user.id === todo.userId) || null,
    }),
  ));
  */

  const [newTodos, setTodos] = useState(usedTodos);
  const [todoTitle, setTodoTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState(0);
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserError, setHasUserError] = useState(false);

  const handleUserChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    if (hasUserError) {
      setHasUserError(false);
    } else {
      setHasUserError(false);
      setSelectedUser(+event.target.value);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!todoTitle) {
      setHasTitleError(true);
    } else {
      setHasTitleError(false);
    }

    if (!selectedUser) {
      setHasUserError(true);
    } else {
      setHasUserError(false);
    }

    if (todoTitle && selectedUser) {
      const newTask = {
        id: getMaxTodoId(usedTodos) + 1,
        title: todoTitle,
        completed: false,
        userId: Number(selectedUser),
        user: getUser(Number(selectedUser)),
      };

      if (newTask !== undefined) {
        setTodos([...newTodos, newTask]);
      }

      setTodoTitle('');
      setSelectedUser(0);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={todoTitle}
            onChange={event => {
              setTodoTitle(event.target.value);
              setHasTitleError(!(event.target.value.length > 0));
            }}
            placeholder="Enter a title"
          />
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={selectedUser}
            onChange={handleUserChange}
          >
            <option value="0" disabled>Choose a user</option>
            {
              users.map(user => (
                <option
                  key={user.id}
                  value={user.id}
                >
                  {user.name}
                </option>
              ))
            }
          </select>

          {hasUserError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={newTodos} />
    </div>
  );
};
