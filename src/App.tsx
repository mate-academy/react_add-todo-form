import React, { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';
import { TodoWithUser } from './types/TodoWithUser';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

const findUserById = (userId: number) => (
  usersFromServer.find(user => user.id === userId) || null
);
const todosWithUsers: TodoWithUser[] = todosFromServer.map(todo => {
  const currentUser = findUserById(todo.userId);

  return {
    ...todo,
    user: currentUser,
  };
});

const getTodoId = (todos: TodoWithUser[]) => {
  const id = Math.max(...todos.map(todo => todo.id));

  return id + 1;
};

export const App: React.FC = () => {
  const [todosList, setTodosList] = useState<TodoWithUser[]>(todosWithUsers);
  const [selectedUser, setSelectedUser] = useState(0);
  const [titleValue, setTitleValue] = useState('');
  const [submitTouched, setSubmitTouched] = useState(false);
  const [hasTitleError, setHasTitleError] = useState(false);

  const resetInputs = () => {
    setTitleValue('');
    setSelectedUser(0);
    setSubmitTouched(false);
  };

  const onFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const trimTitle = titleValue.trim();

    if (!trimTitle) {
      setHasTitleError(true);
    }

    if (!selectedUser) {
      setSubmitTouched(true);
    }

    if (!trimTitle || !selectedUser) {
      return;
    }

    const newTodo: TodoWithUser = {
      id: getTodoId(todosList),
      title: titleValue,
      completed: false,
      userId: selectedUser,
      user: findUserById(selectedUser),
    };

    setTodosList(currentTodos => [...currentTodos, newTodo]);

    resetInputs();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={(event) => onFormSubmit(event)}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={titleValue}
            onChange={(event) => setTitleValue(event.target.value)}
          />
          {(!titleValue && hasTitleError) && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={selectedUser}
            onChange={(event) => setSelectedUser(+event.target.value)}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(user => {
              const { id, name } = user;

              return (
                <option value={id} key={id}>
                  {name}
                </option>
              );
            })}
          </select>

          {(submitTouched && !selectedUser) && (
            <span className="error">Please choose a user</span>
          )}

        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todosList} />
    </div>
  );
};
