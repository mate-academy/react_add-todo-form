import './App.scss';
import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types/postInfo';

function getUserById(userId: number) {
  return usersFromServer.find((user) => user.id === userId)
    || null;
}

export const todos: Todo[] = todosFromServer.map((todo) => ({
  id: todo.id,
  title: todo.title,
  completed: todo.completed,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [currecntTodos, setCurrentTodos] = useState<Todo[]>(todos);

  const [titleError, setTitleError] = useState('');
  const [userError, setUserError] = useState('');

  const addTodo = (newTodo: Todo) => {
    setCurrentTodos(myTodos => [...myTodos, newTodo]);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setTitleError('');
    setUserError('');

    if (!title) {
      setTitleError('Please enter a title');
    }

    if (userId === 0) {
      setUserError('Please choose a user');
    }

    if (title && userId) {
      addTodo({
        id: Math.max(...currecntTodos.map((todo) => todo.id)) + 1,
        title,
        completed: false,
        user: getUserById(userId),
      });

      setTitle('');
      setUserId(0);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
              setTitleError('');
            }}
            placeholder="Enter a title"
          />
          {titleError && <span className="error">{titleError}</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            required
            value={userId}
            onChange={(event) => {
              setUserId(+event.target.value);
              setUserError('');
            }}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map((user) => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>
          {userError && <span className="error">{userError}</span>}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
          onSubmit={handleSubmit}
        >
          Add
        </button>
      </form>

      <TodoList todos={currecntTodos} />
    </div>
  );
};
