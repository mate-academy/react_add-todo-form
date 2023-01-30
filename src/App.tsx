import { useState } from 'react';
import './App.scss';
import { Todo } from './types/Todo';
import { User } from './types/User';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [titleEntered, setTitleEntered] = useState(true);
  const [userSelected, setUserSelected] = useState(true);
  const [currentTodos, setCurrentTodos] = useState(todos);

  const newId = Math.max(...currentTodos.map(todo => todo.id)) + 1;

  function addTodo(id: number) {
    if (title.trim() && getUser(id)) {
      const newTodo = {
        id: newId,
        title,
        userId,
        completed: false,
        user: getUser(userId),
      };

      setUserId(0);
      setTitle('');
      setCurrentTodos([...currentTodos, newTodo]);
    }

    if (!title.trim()) {
      setTitleEntered(false);
    }

    if (!userId) {
      setUserId(0);
      setUserSelected(false);
    }
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={(event => {
          event.preventDefault();
          addTodo(userId);
        })}
      >
        <div className="field">
          <label htmlFor="text_input">Title: </label>
          <input
            type="text"
            id="text_input"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
              setTitleEntered(true);
            }}
          />
          {!titleEntered && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="select_label">User: </label>
          <select
            data-cy="userSelect"
            id="select_label"
            value={userId}
            onChange={(event) => {
              setUserId(+event.target.value);
              setUserSelected(true);
            }}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>

          {!userSelected && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={currentTodos} />
    </div>
  );
};
