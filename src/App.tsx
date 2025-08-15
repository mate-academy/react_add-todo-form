import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { findUserById } from './helpers';

const initialTodos = todosFromServer.map(todo => {
  const updatedTodo = {
    ...todo,
    user: findUserById(todo.userId),
  };

  return updatedTodo;
});

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [title, setTitle] = useState<string>('');
  const [userId, setUserId] = useState<string>('');

  const [titleError, setTitleError] = useState<boolean>(false);
  const [userError, setUserError] = useState<boolean>(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const filteredValue = event.target.value.replace(
      /[^a-zA-Zа-яА-Я0-9\s]/g,
      '',
    );

    setTitle(filteredValue);
    setTitleError(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(event.target.value);
    setUserError(false);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isTitleValid = title.trim().length > 0;
    const isUserValid = userId !== '';

    setTitleError(!isTitleValid);
    setUserError(!isUserValid);

    if (!isTitleValid || !isUserValid) {
      return;
    }

    const newTodo = {
      id: Math.max(...todos.map(todo => todo.id), 0) + 1,
      title: title.trim(),
      userId: +userId,
      completed: false,
      user: findUserById(+userId),
    };

    setTodos(prevState => [...prevState, newTodo]);
    setTitle('');
    setUserId('');
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={onSubmit}>
        <div className="field">
          <input
            value={title}
            type="text"
            data-cy="titleInput"
            placeholder="Please enter a title"
            onChange={handleTitleChange}
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            onChange={handleUserChange}
          >
            <option value="">Choose a user</option>
            {usersFromServer.map(({ name, id }) => {
              return (
                <option value={id} key={id}>
                  {name}
                </option>
              );
            })}
          </select>

          {userError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
