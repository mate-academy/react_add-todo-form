import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todos } from './types/TodosType';
import { useState } from 'react';
import { User } from './types/UserType';

const todosWithUser: Todos[] = todosFromServer.map(todo => {
  return {
    ...todo,
    user: usersFromServer.find(user => user.id === todo.userId),
  };
});

export const App = () => {
  const [todos, setTodos] = useState<Todos[]>([...todosWithUser]);
  const [title, setTitle] = useState<string>('');
  const [selectUserId, setSelectUserId] = useState<number>(0);
  const [hasInputError, setHasInputError] = useState<boolean>(false);
  const [hasSelectError, setHasSelectError] = useState<boolean>(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasInputError(false);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectUserId(+event.target.value);
    setHasSelectError(false);
  };

  const onAdd = (event: React.FormEvent<HTMLFormElement>) => {
    let hasError = false;

    event.preventDefault();
    if (!title) {
      setHasInputError(true);
      hasError = true;
    }

    if (!selectUserId) {
      setHasSelectError(true);
      hasError = true;
    }

    if (hasError) {
      return;
    }

    const newUser: User | undefined = usersFromServer.find(
      user => user.id === selectUserId,
    );
    const newTodo: Todos = {
      id: Math.max(...todos.map(user => user.id)) + 1,
      title: title,
      completed: false,
      userId: selectUserId,
      user: newUser,
    };

    setHasInputError(false);
    setTodos(prev => [...prev, newTodo]);
    setTitle('');
    setSelectUserId(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={event => onAdd(event)}>
        <div className="field">
          <label htmlFor="#title-input">Title: </label>
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            id="#title-input"
            onChange={event => handleInputChange(event)}
          />
          {hasInputError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="#select-input">User: </label>
          <select
            id="#select-input"
            data-cy="userSelect"
            onChange={event => handleSelectChange(event)}
            value={selectUserId}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => {
              return (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              );
            })}
          </select>
          {hasSelectError && (
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
