import { useState } from 'react';
import './App.scss';

import { TodoList } from './components/TodoList';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';

type User = {
  id: number,
  name: string,
  username: string,
  email: string,
};

type Todo = {
  id: number,
  title: string,
  completed: boolean,
  userId: number,
  user: User,
};

function getUserById(userId: number) {
  return usersFromServer.find(user => user.id === userId) || {
    id: 0,
    name: '',
    username: '',
    email: '',
  };
}

const todos: Todo[] = todosFromServer.map((todo) => ({
  ...todo,
  user: getUserById(todo.userId) || {
    id: 0, name: '', username: '', email: '',
  },
}
));

export const App = () => {
  // #region states

  const [currentTodos, setCurrentTodos] = useState<Todo[]>(todos);
  const [currentUser, setCurrentUser] = useState(0);
  const [selectedError, setSelectedUser] = useState(false);
  const [todoTitle, setTodoTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  // #endregion
  // #region functions

  const addTodo = (newTodo: Todo) => {
    if (newTodo) {
      setCurrentTodos(curentTodos => [...curentTodos, newTodo]);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setHasTitleError(!todoTitle);
    setSelectedUser(!currentUser);

    if (currentUser === 0 || !todoTitle) {
      return;
    }

    addTodo({
      id: Math.max(...currentTodos.map(todo => todo.id)) + 1,
      title: todoTitle,
      completed: false,
      userId: currentUser,
      user: getUserById(currentUser),
    });

    setCurrentUser(0);
    setTodoTitle('');
  };

  // #endregion

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
            value={todoTitle}
            placeholder="enter your todo"
            onChange={(event) => {
              setTodoTitle(event.target.value);
              setHasTitleError(!event.target.value);
            }}
            onBlur={(event) => {
              setHasTitleError(!event.target.value);
            }}
          />
          {hasTitleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={currentUser}
            onChange={(event) => {
              setCurrentUser(+event.target.value);
              setSelectedUser(!event.target.value);
            }}
          >
            <option value="0" disabled selected>Choose a user</option>
            {usersFromServer.map(user => {
              return (
                <option
                  value={user.id}
                  key={user.id}
                >
                  {user.name}
                </option>
              );
            })}
          </select>
          {selectedError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList
        todos={currentTodos}
      />
    </div>
  );
};
