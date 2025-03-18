import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoWithUser, Todo, User } from './types/types';
import { TodoList } from './components/TodoList';
import { useState } from 'react';

const getTodoWithUser = (todo: Todo): TodoWithUser => {
  const user =
    usersFromServer.find(
      (searchedUser: User) => searchedUser.id === todo.userId,
    ) || null;

  return { ...todo, user };
};

const todosWithUser = todosFromServer.map((todo: Todo) =>
  getTodoWithUser(todo),
);

export const App = () => {
  const [todos, setTodos] = useState<TodoWithUser[]>(todosWithUser);
  const [title, setTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(0);

  const [isTitleEntered, setIsTitleEntered] = useState(true);
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setIsTitleEntered(true);
  };

  const [isUserSelected, setIsUserSelected] = useState(true);
  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(+event.target.value);
    setIsUserSelected(true);
  };

  const getLastId = (): number => {
    const IDArray: number[] = todos.map((todo: Todo) => todo.id);

    return Math.max(...IDArray);
  };

  const createNewTodo = (
    todoTitle: string,
    userId: number,
    id: number,
  ): TodoWithUser => {
    return getTodoWithUser({
      title: todoTitle,
      userId,
      id,
      completed: false,
    });
  };

  const reset = () => {
    setTitle('');
    setSelectedUserId(0);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!selectedUserId) {
      setIsUserSelected(false);
    }

    if (!title) {
      setIsTitleEntered(false);
    }

    if (!selectedUserId || !title) {
      return;
    }

    const lastId = getLastId();

    setTodos([...todos, createNewTodo(title, selectedUserId, lastId + 1)]);
    reset();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label>
            Title:{' '}
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={event => handleTitleChange(event)}
            />
            {!isTitleEntered && (
              <span className="error">Please enter a title</span>
            )}
          </label>
        </div>

        <div className="field">
          <label>
            User:{' '}
            <select
              data-cy="userSelect"
              value={selectedUserId}
              onChange={event => handleUserIdChange(event)}
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
            {!isUserSelected && (
              <span className="error">Please choose a user</span>
            )}
          </label>
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
