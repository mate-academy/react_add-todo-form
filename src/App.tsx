import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { useState } from 'react';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';

function creatingTodoId(todos: Todo[]) {
  const maxTodoId = todos.map(todo => todo.id);

  return Math.max(...maxTodoId) + 1;
}

function getUserById(userId: number) {
  return usersFromServer.find(user => user.id === userId) || null;
}

export const todosArray: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [selectedUser, setSelectedUser] = useState(0);
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [selectUserError, setSelectUserError] = useState(false);
  const [todos, setTodos] = useState(todosArray);
  const [users] = useState([...usersFromServer]);
  const clearForm = () => {
    setTitle('');
    setSelectedUser(0);
  };

  const addTodo = (todo: Todo) => {
    setTodos([...todos, todo]);
  };

  const newTodo: Todo = {
    id: creatingTodoId(todos),
    title: title,
    completed: false,
    user: users[selectedUser - 1],
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setTitleError(true);
    }

    if (!selectedUser) {
      setSelectUserError(true);
    }

    if (!title.trim() || !selectedUser) {
      return;
    }

    addTodo(newTodo);

    clearForm();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            id="title"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={event => {
              setTitle(event.target.value);
              setTitleError(false);
            }}
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label>
            {'User: '}

            <select
              data-cy="userSelect"
              value={selectedUser}
              onChange={event => {
                setSelectedUser(+event.target.value);
                setSelectUserError(false);
              }}
            >
              <option value="0" disabled>
                Choose a user
              </option>

              {users.map(user => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>

          {selectUserError && (
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
