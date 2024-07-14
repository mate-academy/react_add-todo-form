import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types/todo';
import { useState } from 'react';

type TodosProperties = {
  todos: Todo[];
  titleValue: string;
  userValue: string;
  isFormSubmited: boolean;
};

type HandleChangeTodosState =
  | React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLSelectElement>;

const todosProperties: TodosProperties = {
  todos: todosFromServer,
  titleValue: '',
  userValue: '0',
  isFormSubmited: false,
};

export const App = () => {
  const [todosState, setTodosState] =
    useState<TodosProperties>(todosProperties);
  const { todos, titleValue, userValue, isFormSubmited } = todosState;

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!titleValue.length || userValue === '0') {
      return setTodosState(prev => ({
        ...prev,
        isFormSubmited: true,
      }));
    }

    const userIdSearch = usersFromServer.find(
      user => user.name === userValue,
    )?.id;

    const newTodo: Todo = {
      id: todos.length + 1,
      title: titleValue,
      completed: false,
      userId: userIdSearch as number,
    };

    return setTodosState(prev => ({
      ...prev,
      todos: [...prev.todos, newTodo],
      titleValue: '',
      userValue: '0',
      isFormSubmited: false,
    }));
  };

  const handleChangeTodosState = (e: HandleChangeTodosState) => {
    const { value, id } = e.target;

    if (id === 'titleInput') {
      return setTodosState(prev => ({ ...prev, titleValue: value }));
    }

    return setTodosState(prev => ({ ...prev, userValue: value }));
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmitForm}>
        <div className="field">
          <label htmlFor="titleInput">Title: </label>
          <input
            id="titleInput"
            type="text"
            data-cy="titleInput"
            value={titleValue}
            onChange={handleChangeTodosState}
          />
          {isFormSubmited && !titleValue.length && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User: </label>
          <select
            id="userSelect"
            data-cy="userSelect"
            value={userValue}
            onChange={handleChangeTodosState}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option value={user.name} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {isFormSubmited && userValue === '0' && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
