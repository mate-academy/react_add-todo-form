import './App.scss';

import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { User } from './interface/User';
import { Todo } from './interface/Todo';

const getUserById = (userId: number): User | null => {
  return usersFromServer.find(user => user.id === userId) || null;
};

const initialState: Todo[] = todosFromServer.map((element) => ({
  ...element,
  user: getUserById(element.userId),
}));

const newTodoId = (todos: Todo[]) => {
  return Math.max(...todos.map(todo => todo.id)) + 1;
};

export const App = () => {
  const [todos, setTodos] = useState(initialState);
  const [userId, setUserId] = useState(0);
  const [title, setTitile] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserIdError, setHasUserIdError] = useState(false);

  const reset = () => {
    setTitile('');
    setUserId(0);
  };

  const addTodo = (todo: Todo) => {
    const newTodo = { ...todo, id: newTodoId(todos) };

    setTodos(prev => [...prev, newTodo]);
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasUserIdError(false);
  };

  const handleTitelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitile(event.target.value);
    setHasTitleError(false);
  };

  const handelSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasTitleError(!title.trim());
    setHasUserIdError(!userId);

    if (!title.trim() || !userId) {
      return;
    }

    addTodo({
      id: 0,
      title,
      completed: false,
      userId,
      user: getUserById(userId),
    });

    reset();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={handelSubmit}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={handleTitelChange}
            placeholder="Enter a title"
          />
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            onChange={handleUserIdChange}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>{user.name}</option>
            ))}
          </select>
          {hasUserIdError
            && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={todos} />
    </div>
  );
};
