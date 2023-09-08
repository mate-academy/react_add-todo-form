import './App.scss';
import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './components/types/todo';

function getUserById(userId: number) {
  return usersFromServer.find(user => user.id === userId)
    || null;
}

function getTodos() {
  return todosFromServer.map(todo => ({
    ...todo,
    user: getUserById(todo.userId),
  }));
}

const getNewTodoId = (todos: Todo[]): number => {
  return Math.max(...todos.map((todo) => todo.id)) + 1;
};

export const App = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [todos, setTodos] = useState<Todo[]>(getTodos());
  const [hasError, setHasError] = useState({ title: false, newUser: false });

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasError((curr) => ({ ...curr, title: false }));
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasError((curr) => ({ ...curr, newUser: false }));
  };

  const onAdd = (newTodo: Todo) => {
    setTodos(currTodos => [...currTodos, newTodo]);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title || !userId) {
      setHasError(() => (
        { title: !title, newUser: !userId }
      ));

      return;
    }

    onAdd({
      id: getNewTodoId(todos),
      title,
      completed: false,
      user: getUserById(userId),
    });
    setTitle('');
    setUserId(0);
    setHasError(() => (
      { title: false, newUser: false }
    ));
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
          <label htmlFor="#title">
            {'Title: '}
            <input
              id="title"
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={handleTitleChange}
            />
          </label>
          {hasError.title && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="#user-id">
            {'User: '}
            <select
              id="user-id"
              required
              value={userId}
              data-cy="userSelect"
              onChange={handleUserChange}
            >
              <option value="0" disabled>Choose a user</option>
              {usersFromServer.map(user => (
                <option value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>
          {hasError.newUser && (
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
