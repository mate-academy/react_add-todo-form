import './App.scss';
import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';

const todos = todosFromServer.map((todo) => {
  return {
    ...todo,
    user: usersFromServer.find(user => user.id === todo.userId) || null,
  };
});

export const App = () => {
  const [title, handleTitle] = useState('');
  const [userName, handleOption] = useState('');
  const [visibleTodos, setTodos] = useState(todos);
  const [titleIsValid, setTitle] = useState(true);
  const [userNameIsValid, setUsername] = useState(true);

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={(event) => {
          event.preventDefault();
          if (title && userName) {
            const newTodoId = [...visibleTodos]
              .sort((a, b) => a.id - b.id).reverse()[0].id;
            const newUser = usersFromServer
              .find(user => user.name === userName) || null;
            const newTodo: Todo = {
              id: newTodoId + 1,
              title,
              completed: false,
              userId: newUser?.id || 0,
              user: newUser,
            };

            setTodos([
              ...visibleTodos,
              newTodo,
            ]);

            handleTitle('');
            handleOption('');
          }

          if (!title) {
            setTitle(false);
          }

          if (!userName) {
            setUsername(false);
          }
        }}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={(event) => {
              const { value } = event.target;

              setTitle(true);
              handleTitle(value);
            }}
          />

          {!titleIsValid && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userName}
            onChange={(event) => {
              const { value } = event.target;

              setUsername(true);
              handleOption(value);
            }}
          >
            <option value="" disabled>
              Choose a user
            </option>
            {usersFromServer.map((user) => (
              <option key={user.id}>{user.name}</option>
            ))}
          </select>

          {!userNameIsValid
            && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={visibleTodos} />
    </div>
  );
};
