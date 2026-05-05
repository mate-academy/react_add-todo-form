import './App.scss';
import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { PreparedTodo } from './Type';

export const App = () => {
  const preparedTodos: PreparedTodo[] = todosFromServer.map(todo => {
    const user = usersFromServer.find(
      currentUser => currentUser.id === todo.userId,
    );

    return {
      ...todo,
      user: user!,
    };
  });

  const [todos, setTodos] = useState<PreparedTodo[]>(preparedTodos);
  const [title, setTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [isTitleError, setIsTitleError] = useState(false);
  const [isUserError, setIsUserError] = useState(false);

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        onSubmit={event => {
          event.preventDefault();

          const isTitleEmpty = title.trim() === '';
          const isUserNotSelected = selectedUserId === 0;

          setIsTitleError(isTitleEmpty);
          setIsUserError(isUserNotSelected);

          if (isTitleEmpty || isUserNotSelected) {
            return;
          }

          const user = usersFromServer.find(
            currentUser => currentUser.id === selectedUserId,
          );

          if (!user) {
            return;
          }

          const maxId = Math.max(...todos.map(todo => todo.id));
          const newTodo: PreparedTodo = {
            id: maxId + 1,
            title: title.trim(),
            completed: false,
            userId: selectedUserId,
            user,
          };

          setTodos([...todos, newTodo]);
          setTitle('');
          setSelectedUserId(0);
          setIsTitleError(false);
          setIsUserError(false);
        }}
      >
        <div className="field">
          <label htmlFor="title">Title</label>

          <input
            id="title"
            type="text"
            placeholder="Give a title to your todo"
            data-cy="titleInput"
            value={title}
            onChange={event => {
              const normalizedTitle = event.target.value.replace(
                /[^0-9A-Za-zА-Яа-яІіЇїЄєҐґ\s]/g,
                '',
              );

              setTitle(normalizedTitle);
              setIsTitleError(false);
            }}
          />

          {isTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="user">User</label>

          <select
            id="user"
            data-cy="userSelect"
            value={selectedUserId}
            onChange={event => {
              setSelectedUserId(Number(event.target.value));
              setIsUserError(false);
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

          {isUserError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
