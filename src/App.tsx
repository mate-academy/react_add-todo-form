import './App.scss';

import { TodoList } from './components/TodoList';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';
import { Todo, TodoWithUser } from './types';

const prepareTodos = (todos: Todo[]): TodoWithUser[] => {
  return todos.reduce<TodoWithUser[]>((acc, todo) => {
    const user = usersFromServer.find(userFS => todo.userId === userFS.id);

    if (user) {
      acc.push({ ...todo, user });
    }

    return acc;
  }, []);
};

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(todosFromServer);

  const [titleField, setInputField] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [userSelection, setUserSelection] = useState(0);
  const [hasSelectionError, setHasSelectionError] = useState(false);

  const clearForm = () => {
    setUserSelection(0);
    setInputField('');
  };

  const handleOnSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setHasTitleError(titleField === '');
    setHasSelectionError(userSelection === 0);

    if (titleField === '' || userSelection === 0) {
      return;
    }

    const newTodo: Todo = {
      userId: userSelection,
      title: titleField,
      completed: false,
      id: Math.max(...todos.map(({ id }) => id)) + 1,
    };

    setTodos([...todos, newTodo]);
    clearForm();
  };

  const preparedTodos = prepareTodos(todos);

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleOnSubmit}>
        <label htmlFor="title">Enter a title</label>
        <div className="field">
          <input
            id="title"
            type="text"
            placeholder="title"
            data-cy="titleInput"
            value={titleField}
            onChange={event => {
              setInputField(event.target.value);
              setHasTitleError(false);
            }}
          />
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userSelection}
            onChange={event => {
              setUserSelection(+event.target.value);
              setHasSelectionError(false);
            }}
          >
            <option value="0">Choose a user</option>
            {usersFromServer.map(user => {
              return (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              );
            })}
          </select>

          {hasSelectionError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={preparedTodos} />
    </div>
  );
};
