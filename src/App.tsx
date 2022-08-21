import './App.scss';

import { FormEvent, useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList/TodoList';
import { User } from './types/User';
import { Todo } from './types/Todo';

function getUser(userId: number): User | null {
  return usersFromServer.find(user => user?.id === userId) || null;
}

const todosWithUser: Todo[] = todosFromServer.map((todo) => ({
  ...todo,

  user: getUser(todo.userId),
}));

export const App = () => {
  const [selectValue, setSelectValue] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [todos, setTodos] = useState(todosWithUser);
  const [isValidInput, setIsValidInput] = useState(true);
  const [isValidSelect, setIsValidSelect] = useState(true);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (selectValue === 0) {
      setIsValidSelect(false);
    }

    if (!inputValue.trim()) {
      setIsValidInput(false);
    }

    if (!inputValue.trim() || selectValue === 0) {
      return;
    }

    const maxId = Math.max(...todos.map(todo => todo.id)) + 1;
    const selectedUserById = usersFromServer.find(
      user => user.id === selectValue,
    );

    const createdTodo: Todo = {
      id: maxId,
      title: inputValue,
      completed: false,
      userId: selectValue,
      user: selectedUserById || null,
    };

    setTodos(prevTodo => ([...prevTodo, createdTodo]));
    setSelectValue(0);
    setInputValue('');
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="to do"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              setIsValidInput(true);
            }}
          />
          {!isValidInput && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={selectValue}
            onChange={(e) => {
              setSelectValue(Number(e.target.value));
              setIsValidSelect(true);
            }}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option
                value={user.id}
                key={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>

          {!isValidSelect && (
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
