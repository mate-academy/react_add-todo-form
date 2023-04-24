import './App.scss';
import { useState } from 'react';
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

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        onSubmit={(e) => {
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
        }}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter new todo"
            name="todoTitle"
            value={todoTitle}
            onChange={(e) => {
              const { value } = e.target;
              const regexp = /[\sа-яa-z\d]/gi;
              const validateValue = value.match(regexp)?.join('').trim();

              if (validateValue) {
                setTodoTitle(validateValue);
                setIsTodoTitle(true);
              }
            }}
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
            onChange={(e) => {
              setSelectedUser(e.target.value);

              if (e.target.value !== '0') {
                setIsSelectedUser(true);
              }
            }}
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
