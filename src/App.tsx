import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { AggregatedTodo } from './types/Types';
import { TodoList } from './components/TodoList';
import { FormEvent, useState } from 'react';

const aggregatedTodos: AggregatedTodo[] = todosFromServer.map(todo => {
  const foundUser =
    usersFromServer.find(user => user.id === todo.userId) ?? null;

  return {
    ...todo,
    user: foundUser,
  };
});

export const App = () => {
  const [newTitle, setNewTitle] = useState('');
  const [newUserId, setNewUserId] = useState(0);
  const [todos, setTodos] = useState<AggregatedTodo[]>(aggregatedTodos);
  const [titleError, setTitleError] = useState('');
  const [selectError, setSelectError] = useState('');

  const handleAddTodo = (newTodo: AggregatedTodo) => {
    setTodos(current => [...current, newTodo]);
  };

  const handleValidate = () => {
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

    return hasErrors;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (handleValidate()) {
      return;
    }

    const newTodo: AggregatedTodo = {
      id: Math.max(...todos.map(todo => todo.id)) + 1,
      title: newTitle,
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
          <input
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
