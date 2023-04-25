import './App.scss';
import { ChangeEvent, FormEvent, useState } from 'react';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { Todo } from './types/todo';
import { User } from './types/user';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [todoTitle, setTodoTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState('0');
  const [visibleTodos, setVisibleTodos] = useState(todos);
  const [isSelectedUser, setIsSelectedUser] = useState(true);
  const [isTodoTitle, setIsTodoTitle] = useState(true);

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (selectedUser === '0') {
      setIsSelectedUser(false);
    }

    if (!todoTitle) {
      setIsTodoTitle(false);
    }

    if (selectedUser !== '0' && todoTitle) {
      const todosId = todos.map(todo => todo.id);
      const largestId = Math.max(...todosId);
      const newTodo = {
        id: largestId + 1,
        title: todoTitle,
        completed: false,
        userId: +selectedUser,
        user: getUser(+selectedUser),
      };

      setVisibleTodos([...todos, newTodo]);
      setIsSelectedUser(true);
      setIsTodoTitle(true);
      setSelectedUser('0');
      setTodoTitle('');
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trimStart();
    const regexp = /[\sа-яa-z\d]/gi;
    const validateValue = value.match(regexp)?.join('');

    if (validateValue) {
      setTodoTitle(validateValue);
      setIsTodoTitle(true);
    }
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(e.target.value);

    if (e.target.value !== '0') {
      setIsSelectedUser(true);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        onSubmit={handleFormSubmit}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter new todo"
            name="todoTitle"
            value={todoTitle}
            onChange={handleInputChange}
          />
          {!isTodoTitle && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            name="user"
            value={selectedUser}
            onChange={handleSelectChange}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map((user) => (
              <option
                value={user.id}
                key={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>

          {!isSelectedUser && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={visibleTodos} />
    </div>
  );
};
