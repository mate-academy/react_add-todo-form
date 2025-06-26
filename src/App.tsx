import './App.scss';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './types/Todo';
import { User } from './types/User';
import { useState } from 'react';

function getUserById(userId: number) {
  return usersFromServer.find(user => user.id === userId) || null;
}
// App component

export const App = () => {
  const [todoTitle, setTodoTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const [todosState, setTodosState] = useState<Todo[]>(() =>
    todosFromServer.map(todo => ({
      ...todo,
      user: getUserById(todo.userId) as User,
    })),
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!todoTitle.trim() || !selectedUserId) {
      setTitleError(!todoTitle.trim());
      setUserError(!selectedUserId);

      return;
    }

    const newTodo: Todo = {
      id: Math.max(0, ...todosState.map(t => t.id)) + 1,
      title: todoTitle,
      completed: false,
      userId: Number(selectedUserId),
      user: getUserById(Number(selectedUserId)) as User,
    };

    setTodosState(prev => [...prev, newTodo]);
    setTodoTitle('');
    setSelectedUserId('');
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            name="title"
            data-cy="titleInput"
            value={todoTitle}
            onChange={event => {
              setTodoTitle(event.target.value);
              setTitleError(false);
            }}
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={selectedUserId}
            onChange={event => {
              setSelectedUserId(event.target.value);
              setUserError(false);
            }}
          >
            <option value="" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {userError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todosState} />
    </div>
  );
};
