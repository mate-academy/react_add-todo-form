import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { useState } from 'react';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

interface Todo {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
  user?: User | null;
}

function getUserById(userId: number) {
  return usersFromServer.find(user => user.id === userId) || null
}

export const todos = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {

  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [titleError, setTitleError] = useState(false);
  const [todoList, setTodoList] = useState(todos);

  const addTodo = (newTodo: Todo) => {
    setTodoList(current => [...current, newTodo]);
  }

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setTitle(value);
    setTitleError(value.trim() === '');
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim() && userId === 0) {
      setTitleError(true);

      return;
    }

    const newTodo: Todo = {
      id: Math.max(...todoList.map(en => en.id), 0) + 1,
      title,
      completed: false,
      userId,
      user: getUserById(userId),
    }

    addTodo(newTodo);
    setTitle('');
    setUserId(0);
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
          value={title}
          onChange={handleTitleChange}
          placeholder="Enter a title"
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
          id="user-select"
          value={userId}
          onChange={e=>setUserId(+e.target.value)}
          data-cy="userSelect"
            >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user=> (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {userId === 0 && <span className="error">Please choose a user</span>}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
          >
          Add
        </button>
      </form>

      <TodoList todos={todoList}/>
    </div>
  );
};
