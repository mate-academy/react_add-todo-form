import './App.scss';
import { FormEvent, useState } from 'react';
import { TodoList } from './components/TodoList';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { FullTodo } from './types/FullTodo';

const getUserById = (userId:number) => (
  usersFromServer.find((user) => user.id === userId) || null
);

export const App = () => {
  const [todos, setTodos] = useState(todosFromServer);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [chooseUserError, setChooseUserError] = useState(false);

  const fullTodos: FullTodo[] = todos.map(todo => ({
    ...todo,
    user: getUserById(todo.userId),
  }));

  const clearForm = () => {
    setTitle('');
    setSelectedUserId('');
  };

  const handleSubmit = (event:FormEvent) => {
    event.preventDefault();

    if (!title) {
      setTitleError(true);
    }

    if (!selectedUserId) {
      setChooseUserError(true);
    }

    if (!title || !selectedUserId) {
      return;
    }

    setTodos([...todos, {
      id: todos.length + 1,
      title,
      userId: Number(selectedUserId),
      completed: false,
    }]);

    clearForm();
  };

  const handleSelect = (userSelectValue:string) => {
    setSelectedUserId(userSelectValue);
    setChooseUserError(false);
  };

  const handleTitle = (titleInputValue:string) => {
    setTitle(titleInputValue);
    setTitleError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={(event) => {
          handleSubmit(event);
        }}
      >
        <div className="field">
          <label>
            {'Title: '}
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={(event) => {
                handleTitle(event.target.value);
              }}
            />
          </label>
          {titleError
            && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label>
            {'User: '}
            <select
              data-cy="userSelect"
              value={selectedUserId}
              onChange={(event) => {
                handleSelect(event.target.value);
              }}
            >
              <option value="" disabled>Choose a user</option>
              {usersFromServer.map(user => (
                <option value={user.id}>{user.username}</option>
              ))}
            </select>
          </label>
          {
            chooseUserError
              && <span className="error">Please choose a user</span>
          }
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList fullTodos={fullTodos} />
    </div>
  );
};
