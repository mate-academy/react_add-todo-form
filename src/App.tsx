import './App.scss';
import { FormEvent, useState } from 'react';
import { TodoList } from './components/TodoList/TodoList';
import { User } from './types/User';
import { Todo } from './types/Todo';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

const preparedTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [selectedUserId, setSelectedUserId] = useState('');
  const [selectedTitle, setSelectedTitle] = useState('');
  const [todos, setTodos] = useState(preparedTodos);
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const formValidation = () => {
    if (selectedTitle.trim() && selectedUserId !== '') {
      return true;
    }

    if (!selectedTitle.trim()) {
      setTitleError(true);
    }

    if (selectedUserId === '') {
      setUserError(true);
    }

    return false;
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!formValidation()) {
      return;
    }

    const newId = Math.max(...todos.map(todo => todo.id)) + 1;
    const newTodo = {
      id: newId,
      title: selectedTitle,
      userId: +selectedUserId,
      completed: false,
      user: getUser(Number(selectedUserId)),
    };

    setTodos(prevTodos => {
      return (
        [
          ...prevTodos,
          newTodo,
        ]
      );
    });

    setSelectedTitle('');
    setSelectedUserId('');
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label>
            Title:
            <input
              type="text"
              data-cy="titleInput"
              value={selectedTitle}
              onChange={(event) => {
                setSelectedTitle(event.target.value);
                setTitleError(false);
              }}
              placeholder="Please enter a title"
            />
          </label>
          {titleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label>
            User:
            <select
              data-cy="userSelect"
              value={selectedUserId}
              name="user"
              onChange={(event) => {
                setSelectedUserId(event.target.value);
                setUserError(false);
              }}
            >
              <option value="" disabled>Choose a user</option>
              {usersFromServer.map(user => {
                return (
                  <option value={user.id} key={user.id}>{user.name}</option>
                );
              })}
            </select>
          </label>
          {userError && (
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
