import React, { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './types/Todo';
import { User } from './types/User';
import { TodoList } from './components/TodoList';
import './App.scss';

const getUserById = (userId: number): User | null => {
  return usersFromServer.find((user) => user.id === userId) || null;
};

const getUserByName = (userName: string): User | null => {
  return usersFromServer.find((user) => user.name === userName) || null;
};

const todosWithUsers: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [selectedUserName, setSelectedUserName] = useState('');
  const [todos, setTodos] = useState(todosWithUsers);
  const [isTitleValid, setIsTitleValid] = useState(true);
  const [isUserValid, setIsUserValid] = useState(true);

  const changeTodoTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setNewTodoTitle(value);
  };

  const changeSelectedUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setSelectedUserName(value);
  };

  const addNewTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newTodoTitleTrimmed = newTodoTitle.trim();

    setIsTitleValid(Boolean(newTodoTitleTrimmed));
    setIsUserValid(Boolean(selectedUserName));

    if (!newTodoTitleTrimmed || !selectedUserName) {
      return;
    }

    const lastTodoId = [...todos]
      .sort((todoA, todoB) => todoB.id - todoA.id)[0].id;

    const userForNewTodo = getUserByName(selectedUserName);

    setTodos([
      ...todos,
      {
        id: lastTodoId + 1,
        title: newTodoTitle,
        completed: false,
        userId: userForNewTodo?.id,
        user: userForNewTodo,
      },
    ]);

    setNewTodoTitle('');
    setSelectedUserName('');
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="TODO"
        onSubmit={addNewTodo}
      >
        <div className="field">
          <label>
            {'Title: '}
            <input
              type="text"
              data-cy="titleInput"
              value={newTodoTitle}
              onChange={changeTodoTitle}
              placeholder="Enter a title"
            />
          </label>

          {!isTitleValid && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label>
            {'User: '}
            <select
              data-cy="userSelect"
              value={selectedUserName}
              onChange={changeSelectedUser}
            >
              <option value="" disabled>Choose a user</option>

              {usersFromServer.map(user => (
                <option value={user.name} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>

          {!isUserValid && (
            <span className="error">Please choose a user</span>
          )}
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
