import { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import { TodoList } from './components/TodoList';
import todosFromServer from './api/todos';
import { Todo } from './types/Todo';

export const App = () => {
  const prepareTodos = (todosArr: Todo[]): Todo[] => {
    return todosArr.map(todo => {
      const user = usersFromServer.find(u => u.id === todo.userId);

      return {
        ...todo,
        user,
      };
    });
  };

  const [currentTodos, setCurrentTodos] = useState(
    prepareTodos(todosFromServer),
  );

  const [value, setValue] = useState('');
  const [inputError, setInputError] = useState(false);

  const [userSelected, setUserSelected] = useState(0);

  const [userError, setUserError] = useState(false);

  const generateNewId = (todos: Todo[]) => {
    return Math.max(...todos.map(todo => todo.id)) + 1;
  };

  const addNewTodo = (newTodo: Todo) => {
    return setCurrentTodos(Todos => [...Todos, newTodo]);
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    setInputError(false);
  };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserSelected(+event.target.value);

    setUserError(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setInputError(!value.trim());
    setUserError(!userSelected);

    if (!value.trim() || !userSelected) {
      return;
    }

    addNewTodo({
      id: generateNewId(currentTodos),
      title: value,
      completed: false,
      userId: userSelected,
      user: {
        email: usersFromServer.find(user => user.id === userSelected)?.email,
        id: usersFromServer.find(user => user.id === userSelected)?.id,
        name: usersFromServer.find(user => user.id === userSelected)?.name,
        username: usersFromServer.find(user => user.id === userSelected)
          ?.username,
      },
    });

    setValue('');
    setUserSelected(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/users" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="input">Title: </label>
          <input
            id="input"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={value}
            onChange={handleInput}
          />
          {inputError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="input">User: </label>
          <select
            id="select"
            data-cy="userSelect"
            value={userSelected}
            onChange={handleSelect}
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

          {userError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={currentTodos} />
    </div>
  );
};
