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
  const [title, setTitle] = useState('');
  const [userName, setUserName] = useState('');
  const [visibleTodos, setTodos] = useState(todos);
  const [isTitleValid, checkTitle] = useState(true);
  const [isUserNameValid, checkUserName] = useState(true);

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
              .sort((todoA, todoB) => todoA.id - todoB.id).reverse()[0].id;
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

            setTitle('');
            setUserName('');
          }

          if (!title) {
            checkTitle(false);
          }

          if (!userName) {
            checkUserName(false);
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

              checkTitle(true);
              setTitle(value);
            }}
          />

          {!isTitleValid && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userName}
            onChange={(event) => {
              const { value } = event.target;

              checkUserName(true);
              setUserName(value);
            }}
          >
            <option value="" disabled>
              Choose a user
            </option>
            {usersFromServer.map((user) => (
              <option key={user.id}>{user.name}</option>
            ))}
          </select>

          {!isUserNameValid
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
