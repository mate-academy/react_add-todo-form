import './App.scss';
import { TodoList } from './components/TodoList';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';
import { Todo } from './types/Todo';
import { User } from './types/User';

export const App = () => {
  const getUserById = (id: number, errorMessage = 'User not found'): User => {
    const user = usersFromServer.find(usr => usr.id === id);

    if (!user) {
      throw new Error(errorMessage);
    }

    return user;
  };

  const [selectedUser, setSelectedUser] = useState<number>(0);
  const [todos, setTodos] = useState<Todo[]>(() =>
    todosFromServer.map(todo => ({
      ...todo,
      user: getUserById(todo.userId),
    })),
  );

  const [title, setTitle] = useState<string>('');
  const [inputTouched, setInputTouched] = useState<boolean>(false);
  const [userNotSelected, setUserNotSelected] = useState<boolean>(false);

  const getNextTodoId = (): number => {
    const maxId =
      todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) : 0;

    return maxId + 1;
  };

  const resetForm = (): void => {
    setTitle('');
    setInputTouched(false);
    setSelectedUser(0);
    setUserNotSelected(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isUserNotSelected = selectedUser === 0;
    const isTitleEmpty = !title.trim();

    setUserNotSelected(isUserNotSelected);
    setInputTouched(isTitleEmpty);

    if (isUserNotSelected || isTitleEmpty) {
      return;
    }

    const newTodo: Todo = {
      id: getNextTodoId(),
      title: title.trim(),
      completed: false,
      userId: selectedUser,
      user: getUserById(selectedUser),
    };

    setTodos(prevTodos => [...prevTodos, newTodo]);

    resetForm();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter title"
            value={title}
            onChange={e => {
              setInputTouched(true);
              setTitle(e.target.value);
            }}
          />
          {inputTouched && !title && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={selectedUser}
            onChange={e => setSelectedUser(+e.target.value)}
          >
            <option value="0" disabled key={0}>
              Choose a user
            </option>

            {usersFromServer.map(usr => {
              return (
                <option key={usr.id} value={usr.id}>
                  {usr.name}
                </option>
              );
            })}
          </select>

          {userNotSelected && selectedUser === 0 && (
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
