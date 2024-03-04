import { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { getUserById } from './services/user';
import { Todo } from './types/Todo';
import { User } from './types/User';

const initialTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

function getNewTodoId(todos: Todo[]) {
  const maxId = Math.max(...todos.map(todo => todo.id));

  return maxId + 1;
}

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);

  const addTodo = (todo: Todo) => {
    setTodos(currentTodo => [...currentTodo, todo]);
  };

  const clear = () => {
    setTitle('');
    setUserId(0);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    addTodo({
      id: getNewTodoId(todos),
      title,
      userId,
      completed: false,
      user: getUserById(userId),
    });

    clear();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="input-title">Title: </label>
          <input
            id="input-title"
            type="text"
            data-cy="titleInput"
            value={title}
            placeholder="Enter a title"
            onChange={event => {
              setTitle(event.target.value);
            }}
          />
          <span className="error">Please enter a title</span>
        </div>

        <div className="field">
          <label htmlFor="select-user">User: </label>
          <select
            id="select-user"
            data-cy="userSelect"
            value={userId}
            onChange={event => {
              setUserId(+event.target.value);
            }}
          >
            <option defaultValue="0" disabled={userId !== 0}>
              Choose a user
            </option>

            {usersFromServer.map((user: User) => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          <span className="error">Please choose a user</span>
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
