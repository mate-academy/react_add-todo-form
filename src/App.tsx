import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';
import { TodoList } from './components/TodoList';
import { PreparedTodo, Todo } from './types/Todo';
import { User } from './types/User';

function getUser(users: User[], query: number): User | null {
  return users.find(user => user.id === query) || null;
}

function getPreparedTodos(todos: Todo[]): PreparedTodo[] {
  const copyTodos = [...todos];

  return copyTodos.map(todo => {
    const user = getUser(usersFromServer, todo.userId);

    return {
      ...todo,
      user,
    };
  });
}

function getNextTodoId(todos: Todo[]): number {
  const todoIds = todos.map(todo => todo.id);

  return Math.max(...todoIds) + 1;
}

export const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [selectValue, setSelectValue] = useState(0);
  const [inputError, setInputError] = useState(false);
  const [selectError, setSelectError] = useState(false);
  const [allTodos, setAllTodos] = useState<Todo[]>(todosFromServer);
  const visibleTodos = getPreparedTodos(allTodos);

  function resetForm() {
    setInputValue('');
    setSelectValue(0);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    const user = getUser(usersFromServer, selectValue);

    let hasError = false;

    if (inputValue.trim() === '') {
      setInputError(true);
      hasError = true;
    }

    if (!user) {
      setSelectError(true);
      hasError = true;
    }

    if (hasError) {
      return;
    }

    const newTodo: Todo = {
      id: getNextTodoId(allTodos),
      title: inputValue,
      userId: user!.id,
      completed: false,
    };

    setAllTodos(prevTodos => [...prevTodos, newTodo]);

    resetForm();
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="input">
            <span>Title: </span>
          </label>
          <input
            id="input"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            name="input"
            value={inputValue}
            onChange={event => {
              setInputValue(event.target.value);
              setInputError(false);
            }}
          />
          {inputError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="select">
            <span>User: </span>
          </label>
          <select
            data-cy="userSelect"
            id="select"
            name="select"
            value={selectValue}
            onChange={event => {
              setSelectValue(Number(event.target.value));
              setSelectError(false);
            }}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {selectError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={visibleTodos} />
    </div>
  );
};
