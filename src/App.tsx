import { useState, ChangeEvent, SyntheticEvent } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { User } from './types/User';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const staticTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [todoTitle, setTodoTitle] = useState('');
  const [todoUser, setTodoUser] = useState(0);
  const [todos, setTodos] = useState(staticTodos);
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(event.target.value);
    setTitleError(false);
  };

  const handleSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    setTodoUser(+event.target.value);
    setUserError(false);
  };

  const createToDo = (event: SyntheticEvent) => {
    event.preventDefault();

    if (!todoTitle.length) {
      setTitleError(true);
    }

    if (!todoUser) {
      setUserError(true);
    }

    if (todoTitle.length && todoUser) {
      const newTodo = {
        completed: false,
        id: Math.max(...todos.map(todo => todo.id)) + 1,
        title: todoTitle,
        user: getUser(todoUser),
        userId: todoUser,
      };

      setTodos((currentTodos: Todo[]) => (
        [
          ...currentTodos,
          newTodo,
        ]
      ));

      setTodoUser(0);
      setTodoTitle('');
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/users" method="POST">
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={todoTitle}
            onChange={handleInput}
          />
          {titleError
          && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={todoUser}
            onChange={handleSelect}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>

          {userError
          && <span className="error">Please choose a user</span>}
        </div>
        <button
          type="submit"
          data-cy="submitButton"
          onClick={createToDo}
        >
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
