import React, { useState } from 'react';
import { TodoList } from './components/TodoList/TodoList';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './types/Todo';
import { User } from './types/User';
import { FullTodo } from './types/FullTodo';

function findUserById(users: User[], userId: number): User | null {
  return users.find(user => user?.id === userId) || null;
}

function getTodoList(todos: Todo[]):FullTodo[] {
  return todos.map(todo => {
    return {
      ...todo,
      user: findUserById(usersFromServer, todo.userId),
    };
  });
}

function getNextTodoId(todos: FullTodo[]): number {
  if (!todos.length) {
    return 1;
  }

  const maxId = Math.max(...todos.map(todo => todo.id));

  return maxId + 1;
}

export const App: React.FC = () => {
  const [formTitle, setFormTitle] = useState('');
  const [todosList, setTodosList] = useState<Todo[]>([...todosFromServer]);
  const [userId, setUserId] = useState(0);
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasSelectError, setHasSelectError] = useState(false);

  const todos = getTodoList(todosList);

  const reset = () => {
    setFormTitle('');
    setUserId(0);
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasTitleError(!formTitle);
    setHasSelectError(!userId);

    if (formTitle && userId) {
      const newTodo = {
        id: getNextTodoId(todos),
        title: formTitle,
        userId,
        completed: false,
      };

      setTodosList((prevTodos) => [...prevTodos, newTodo]);
      reset();
    }
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasSelectError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={handleFormSubmit}
      >
        <div className="field">
          <label>
            {'Title: '}
            <input
              placeholder="Enter a title"
              type="text"
              data-cy="titleInput"
              value={formTitle}
              onChange={handleTitleChange}
            />
          </label>
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label>
            {'User: '}
            <select
              data-cy="userSelect"
              value={userId}
              onChange={handleSelectChange}
            >
              <option
                value={0}
                disabled
              >
                Choose a user
              </option>
              {usersFromServer.map(user => (
                <option
                  key={user.id}
                  value={user.id}
                >
                  {user.name}
                </option>
              ))}
            </select>
          </label>

          {hasSelectError
            && <span className="error">Please choose a user</span>}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <TodoList
        todos={todos}
      />
    </div>
  );
};
