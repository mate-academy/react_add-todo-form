import { useState } from 'react';

import todosFromServer from './api/todos';
import usersFromServer from './api/users';
import './App.scss';
import { TodoList } from './components/TodoList';
import { User } from './types/User';
import { NewTodo, Todo } from './types/Todo';

const preTodos = todosFromServer.map((todo: Todo) => ({
  ...todo,
  user: usersFromServer.find(user => user.id === todo.userId) as User,
}));

export const App = () => {
  const [todos, setTodos] = useState<NewTodo[]>(preTodos);
  const [title, setTitle] = useState('');
  const [hasTitle, setHasTitle] = useState(false);
  const [userId, setUserId] = useState(0);
  const [hasUserId, setHasUserId] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setHasTitle(!title);
    setHasUserId(!userId);

    if (!title || !userId) {
      return;
    }

    const newTodo = {
      id: Math.max(...preTodos.map(todo => todo.id)) + 1,
      title: title,
      completed: false,
      userId: userId,
      user: usersFromServer.find(user => user.id === userId) as User,
    };

    setTodos(prevState => [...prevState, newTodo]);

    setTitle('');
    setUserId(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={event => {
              setTitle(event.target.value);
              setHasTitle(false);
            }}
          />
          {hasTitle && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            onChange={event => {
              setUserId(+event.target.value);
              setHasUserId(false);
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
          {hasUserId && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={todos} />
    </div>
  );
};
