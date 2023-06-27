import { useState } from 'react';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import './App.scss';

const findUser = (userId: number) => (
  usersFromServer.find(user => user.id === userId) || null
);

export const newTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: findUser(todo.userId),
}));

export const App = () => {
  const [title, setTitle] = useState('');
  const [todos, setTodos] = useState(newTodos);
  const [selectedUser, setSelectedUser] = useState(0);
  const [incorrectUser, setIncorrectUser] = useState(false);
  const [titleError, setTitleError] = useState(false);

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const hastitleError = !title.trim();
    const hasIncorrectUser = selectedUser === 0;

    setTitleError(hastitleError);
    setIncorrectUser(hasIncorrectUser);

    if (hastitleError || hasIncorrectUser) {
      return;
    }

    setTodos(prevTodos => {
      const newId = Math.max(...prevTodos.map(todo => todo.id)) + 1;

      const newTodo = {
        id: newId,
        title: title.trim(),
        completed: false,
        userId: selectedUser,
        user: findUser(selectedUser),
      };

      return [
        ...prevTodos,
        newTodo,
      ];
    });

    setTitle('');
    setSelectedUser(0);
  };

  const onChange = (
    event:
    React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>,
  ) => {
    if (event.target.name === 'title') {
      setTitle(event.target.value);
      setTitleError(false);
    }

    if (event.target.name === 'user') {
      setSelectedUser(+(event.target.value));
      setIncorrectUser(false);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={submitForm}
      >
        <div className="field">
          <label>
            {'Title: '}

            <input
              type="text"
              data-cy="titleInput"
              name="title"
              value={title}
              onChange={onChange}
              placeholder="Enter a title"
            />
          </label>
          {
            titleError
            && <span className="error">Please enter a title</span>
          }
        </div>

        <div className="field">
          <label>
            {'User: '}

            <select
              data-cy="userSelect"
              name="user"
              value={selectedUser}
              onChange={onChange}
            >
              <option value="0" disabled>Choose a user</option>
              {usersFromServer.map(user => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))}
            </select>
          </label>
          {
            incorrectUser
            && <span className="error">Please choose a user</span>
          }
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={todos} />
    </div>
  );
};
