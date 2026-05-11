import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { UnifiedTodo } from './types/Types';
import { TodoList } from './components/TodoList';
import { FormEvent, useState } from 'react';
// import { event } from 'cypress/types/jquery';

const unifiedTodo: UnifiedTodo[] = todosFromServer.map(todo => {
  const foundUser =
    usersFromServer.find(user => user.id === todo.userId) ?? null;

  if (!foundUser) {
    throw new Error(`Missing user in todo: ${todo.id}`);
  }

  return {
    ...todo,
    user: foundUser,
  };
});

export const App = () => {
  const [newTitle, setNewTitle] = useState('');
  const [newUserId, setNewUserId] = useState(0);
  const [todos, setTodos] = useState<UnifiedTodo[]>(unifiedTodo);
  const [titleError, setTitleError] = useState('');
  const [selectError, setSelectError] = useState('');

  const handleAddTodo = (newTodo: UnifiedTodo) => {
    setTodos(current => [...current, newTodo]);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let hasErrors = false;

    const preparedTitle = newTitle.trim();

    if (!preparedTitle) {
      setTitleError('Please enter a title');
      hasErrors = true;
    }

    if (!newUserId) {
      setSelectError('Please choose a user');
      hasErrors = true;
    }

    if (hasErrors) {
      return;
    }

    const newTodo: UnifiedTodo = {
      id: Math.max(...todos.map(todo => todo.id)) + 1,
      title: preparedTitle,
      completed: false,
      userId: newUserId,
      user: usersFromServer.find(user => user.id === newUserId)!,
    };

    handleAddTodo(newTodo);
    setNewTitle('');
    setNewUserId(0);
  };

  const handleTitleChange = (value: string) => {
    setNewTitle(value);
    setTitleError('');
  };

  const handleSelectChange = (value: number) => {
    setNewUserId(value);
    setSelectError('');
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="titleInput">Todo Title</label>
          <input
            id="titleInput"
            placeholder="Enter a title"
            type="text"
            data-cy="titleInput"
            value={newTitle}
            onChange={event =>
              handleTitleChange(event.target.value.trimStart())
            }
          />
          {titleError && <span className="error">{titleError}</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelect">Assign to user</label>
          <select
            data-cy="userSelect"
            value={newUserId}
            onChange={event => handleSelectChange(Number(event.target.value))}
          >
            <option value={0} disabled>
              Choose a user
            </option>

            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {selectError && <span className="error">{selectError}</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={todos} />
    </div>
  );
};
