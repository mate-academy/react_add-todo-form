import { useState } from 'react';

import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { User } from './services/User';
import { Todo } from './services/Todo';

function getTodoId(todos: Todo[]) {
  const maxId = Math.max(...todos.map(todo => todo.id));

  return maxId + 1;
}

function getUserById(userId: number): User | null {
  return usersFromServer.find(user => user.id === userId)
    || null;
}

const todosWithUsersInfo = todosFromServer.map(todo => {
  return {
    ...todo,
    user: getUserById(todo.userId),
  };
});

const initialUserState = {
  id: 0,
  name: '',
  username: '',
  email: '',
};

const initialTodoState = {
  id: 0,
  title: '',
  completed: false,
  userId: 0,
  user: {},
};

export const App = () => {
  const [userName, setUserName] = useState('');
  const [newTodo, setNewTodo] = useState({
    ...initialTodoState,
    user: initialUserState,
  });
  const [todos, setTodos] = useState(todosWithUsersInfo);
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasNameError, setHasNameError] = useState(false);

  const onUserChange = (newUserName: string) => {
    const foundUser = usersFromServer.find(user => (
      user.name === newUserName
    ));

    setHasNameError(false);
    setUserName(newUserName);
    setNewTodo(prevInput => ({
      ...prevInput,
      user: {
        ...initialUserState,
        name: newUserName,
        email: foundUser?.email || '',
      },
    }));
  };

  const onTitleChange = (newValue: string) => {
    setHasTitleError(false);
    setNewTodo(prevInput => ({
      ...prevInput,
      title: newValue,
    }));
  };

  const reset = () => {
    setUserName('');
    setNewTodo(prevTodo => ({
      ...prevTodo,
      title: '',
      user: initialUserState,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasTitleError(!newTodo.title);
    setHasNameError(!userName);

    if (!newTodo.title || !userName) {
      return;
    }

    const addedTodo = {
      ...newTodo,
      id: getTodoId(todos),
    };

    setTodos(currentTodos => [
      ...currentTodos, addedTodo,
    ]);
    reset();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={newTodo.title}
            onChange={(event) => onTitleChange(event.target.value)}
          />

          {hasTitleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userName}
            onChange={(event) => onUserChange(event.target.value)}
          >
            <option value="">Choose a user</option>

            {usersFromServer.map(user => (
              <option
                value={user.name}
                key={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>

          {hasNameError && (
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
