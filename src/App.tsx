import './App.scss';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './types/Todos';
import { useState } from 'react';

const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: usersFromServer.find(user => user.id === todo.userId) || null,
}));

function getMaxId(todosId: Todo[]): number {
  const newID = Math.max(...todosId.map((todo: Todo) => todo.id));

  return newID + 1;
}

export const App = () => {
  const [todosList, setTodosList] = useState<Todo[]>(todos);

  const [title, setTitle] = useState<string>('');
  const [titleError, setTitleError] = useState<boolean>(false);

  const [userId, setUserId] = useState<number>(0);
  const [userIdError, setUserIdError] = useState<boolean>(false);

  const addTodo = (newTodo: Todo) => {
    setTodosList(prevTodos => [...prevTodos, newTodo]);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (userId === 0) {
      setUserIdError(true);
    }

    if (!title.trim()) {
      setTitleError(true);
    }

    if (userId === 0 || !title.trim()) {
      return;
    }

    addTodo({
      id: getMaxId(todosList),
      title: title,
      userId: userId,
      completed: false,
      user: usersFromServer.find(user => user.id === userId) || null,
    });

    setTitle('');
    setUserId(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <input
            placeholder="Enter title"
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={e => {
              setTitle(e.target.value);
              setTitleError(false);
            }}
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            required
            data-cy="userSelect"
            value={userId}
            onChange={e => {
              setUserId(+e.target.value);
              setUserIdError(false);
            }}
          >
            <option value="0" disabled>
              Choose a user
            </option>

            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {userIdError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todosList} />
    </div>
  );
};
