import { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { User } from './types/User';
import { PreparedTodo } from './types/PreparedTodo';

function getUserById(userId: number) {
  const user = usersFromServer.find(userTodo => userTodo.id === userId);

  return user !== null ? user : undefined;
}

const initialTodos = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId)!,
}));

export const App: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [inputError, setInputError] = useState(false);
  const hasErrorInput = inputError && !inputValue;

  const [optionValue, setOptionValue] = useState('');
  const [optionError, setOptionError] = useState(false);
  const hasErrorOption = optionError && !optionValue;

  const users = usersFromServer.map(user => user);
  const [todos, setTodos] = useState<PreparedTodo[]>(initialTodos);

  const maxId = Math.max(...todos.map(todo => todo.id));

  const [todoId, changeId] = useState(maxId + 1);

  const onAdd = (event: React.FormEvent) => {
    event.preventDefault();
    const user = getUserById(Number(optionValue));

    setOptionError(!user);
    setInputError(!inputValue);

    if (!user || !inputValue) {
      return;
    }

    const newTodo: PreparedTodo = {
      id: todoId,
      title: inputValue,
      completed: false,
      userId: user.id,
      user,
    };

    changeId(currentId => currentId + 1);

    setTodos(currentTodos => [...currentTodos, newTodo]);

    setInputValue('');
    setOptionValue('');
    setInputError(false);
    setOptionError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={onAdd}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={inputValue}
            placeholder="Enter a title"
            onChange={event => setInputValue(event.target.value)}
          />
          {hasErrorInput && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={optionValue}
            onChange={event => {
              setOptionValue(event.target.value);
            }}
          >
            <option value="0">Choose a user</option>
            {users.map((user: User) => {
              return (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              );
            })}
          </select>
          {hasErrorOption && (
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
