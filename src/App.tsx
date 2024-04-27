import './App.scss';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';
import { TodoItem } from './types/TodoItem';

const findUserById = (id: number) => {
  return usersFromServer.find(user => user.id === id);
};

const initialTodoList: TodoItem[] = todosFromServer.map(todo => ({
  ...todo,
  user: findUserById(todo.userId),
}));

export const App = () => {
  const [listOfTodos, setListOfTodos] = useState<TodoItem[]>(initialTodoList);
  const [newTodo, setNewTodo] = useState({
    id: '',
    title: '',
    completed: false,
    userId: 0,
  });
  const [titleFieldError, setTitleFieldError] = useState(false);
  const [userFieldError, setUserFieldError] = useState(false);

  const clearForm = () => {
    setNewTodo({
      id: '',
      title: '',
      completed: false,
      userId: 0,
    });
  };

  const getNewTodoId = () => {
    const maxId = listOfTodos.reduce((max, todo) => Math.max(max, todo.id), 0);

    return maxId + 1;
  };

  const isFormValid = () => {
    let isValid = true;

    if (!newTodo.title.trim()) {
      setTitleFieldError(true);
      isValid = false;
    } else {
      setTitleFieldError(false);
    }

    if (!newTodo.userId) {
      setUserFieldError(true);
      isValid = false;
    } else {
      setUserFieldError(false);
    }

    return isValid;
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;

    if (name === 'userId') {
      setUserFieldError(false);
      setNewTodo(cur => ({ ...cur, [name]: Number(value) }));
    } else {
      setTitleFieldError(false);
      setNewTodo(cur => ({ ...cur, [name]: value }));
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!isFormValid()) {
      return;
    }

    setListOfTodos(currentList => [
      ...currentList,
      {
        ...newTodo,
        id: getNewTodoId(),
        user: findUserById(newTodo.userId),
      },
    ]);
    clearForm();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title">
            Title:
            <input
              type="text"
              id="title"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={newTodo.title}
              name="title"
              onChange={handleChange}
            />
          </label>
          {titleFieldError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="userId">
            User:
            <select
              id="userId"
              data-cy="userSelect"
              value={newTodo.userId}
              name="userId"
              onChange={handleChange}
            >
              <option value="0" disabled>
                Choose a user
              </option>
              {usersFromServer.map(user => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>
          {userFieldError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={listOfTodos} />
    </div>
  );
};
