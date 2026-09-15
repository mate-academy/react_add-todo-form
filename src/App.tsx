import './App.scss';
import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList/TodoList';

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};
type Todo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
};

export type Todos = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user: User | undefined;
};

function getTodos(users: User[], todo: Todo[]): Todos[] {
  return todo.map(todoItem => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const user = users.find(user => user.id === todoItem.userId);

    return { ...todoItem, user };
  });
}

export const App = () => {
  const visibleTodos = getTodos(usersFromServer, todosFromServer);
  const [todoItem, setTodoItem] = useState(visibleTodos);
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserError, setHasUserError] = useState(false);

  const addTodos = (todo: Todos) => {
    setTodoItem(currentTodo => [...currentTodo, todo]);
  };

  const isValidate = selectedUserId !== 0 && title !== '';

  const submitHandle = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setHasTitleError(title === '');
    setHasUserError(selectedUserId === 0);

    if (!isValidate) {
      return;
    }

    const user = usersFromServer.find(person => person.id === selectedUserId);

    if (!user) {
      return;
    }

    const newTodo: Todos = {
      id: Math.max(0, ...todoItem.map(todo => todo.id)) + 1,
      title,
      completed: false,
      userId: selectedUserId,
      user: user,
    };

    addTodos(newTodo);
    setSelectedUserId(0);
    setTitle('');
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={event => submitHandle(event)}
      >
        <div className="field">
          <label htmlFor="titleInput">Title</label>
          <input
            type="text"
            id="titleInput"
            data-cy="titleInput"
            value={title}
            placeholder="Enter a title"
            onChange={event => {
              setTitle(event.target.value);
              setHasTitleError(false);
            }}
          />
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User</label>
          <select
            id="userSelect"
            data-cy="userSelect"
            value={selectedUserId}
            onChange={event => {
              setSelectedUserId(+event.target.value);
              setHasUserError(false);
            }}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {hasUserError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={todoItem} />
    </div>
  );
};
