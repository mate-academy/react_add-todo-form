import { FormEvent, useState } from 'react';
import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { User } from './types/User';

const getUserById = (userId: number): User => {
  const user = usersFromServer.find(person => person.id === userId);

  if (!user) {
    throw new Error(`User with id ${userId} was not found`);
  }

  return user;
};

export const App = () => {
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [userError, setUserError] = useState(false);
  const [todos, setTodos] = useState<Todo[]>(
    todosFromServer.map(todo => ({
      ...todo,
      user: getUserById(todo.userId),
    })),
  );

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const hasTitle = title.trim().length > 0;
    const hasSelectedUser = selectedUserId !== '';

    if (!hasTitle) {
      setTitleError(true);
    }

    if (!hasSelectedUser) {
      setUserError(true);
    }

    if (!hasTitle || !hasSelectedUser) {
      return;
    }

    const userId = Number(selectedUserId);
    const user = getUserById(userId);
    const maxTodoId =
      todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) : 0;
    const newTodo: Todo = {
      id: maxTodoId + 1,
      title: title.trim(),
      userId,
      completed: false,
      user,
    };

    setTodos(currentTodos => [...currentTodos, newTodo]);
    setTitle('');
    setSelectedUserId('');
    setTitleError(false);
    setUserError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            type="text"
            placeholder="Enter a title"
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
          <label htmlFor="userId">User:</label>
          <select
            id="userId"
            data-cy="userSelect"
            value={selectedUserId}
            onChange={e => {
              setSelectedUserId(e.target.value);
              setUserError(false);
            }}
          >
            <option value="">Choose a user</option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>
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

      <TodoList todos={todos} />
    </div>
  );
};
