import './App.scss';
import { useState } from 'react';

import { TodoList } from './components/TodoList';
import { User } from './Types/User';
import { Todo } from './Types/Todo';
import { ToDoWithUser } from './Types/ToDoWithUser';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function getTodosWithUser(todos: Todo[], users: User[]): ToDoWithUser[] {
  const result: ToDoWithUser[] = [];

  for (const todo of todos) {
    const user = users.find(u => u.id === todo.userId);

    if (user) {
      result.push({ ...todo, user });
    }
  }

  return result;
}

export const App: React.FC = () => {
  const preparedTodos = getTodosWithUser(todosFromServer, usersFromServer);

  const [todos, setTodos] = useState<ToDoWithUser[]>(preparedTodos);
  const [title, setTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [titleError, setTitleError] = useState(false);
  const [selectUserIdError, setSelectUserIdError] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const emptyTitle = title.trim() === '';
    const emptyUser = selectedUserId === 0;

    setTitleError(emptyTitle);
    setSelectUserIdError(emptyUser);

    if (emptyTitle || emptyUser) {
      return;
    }

    const user = usersFromServer.find(
      candidate => candidate.id === selectedUserId,
    );

    if (!user) {
      return;
    }

    const newId = Math.max(...todos.map(todo => todo.id), 0) + 1;

    const newTodo: ToDoWithUser = {
      id: newId,
      title: title.trim(),
      completed: false,
      userId: user.id,
      user,
    };

    setTodos(prev => [...prev, newTodo]);
    setTitle('');
    setSelectedUserId(0);
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <input
            value={title}
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            onChange={event => {
              setTitle(event.target.value);
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
              setSelectedUserId(+event.target.value);
              setSelectUserIdError(false);
            }}
          >
            <option value={0} disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {selectUserIdError && (
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
