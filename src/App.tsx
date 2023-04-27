import './App.scss';
import {FormEvent, useState} from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';

const findUserById = (userId: number) => {
  return usersFromServer.find(user => user.id === userId) || null;
};

const todos = todosFromServer.map((todo) => {
  return {
    ...todo,
    user: findUserById(todo.userId),
  };
});

export const App = () => {
  const [title, setTitle] = useState('');
  const [userName, setUserName] = useState('');
  const [visibleTodos, setTodos] = useState(todos);
  const [isTitleValid, checkTitle] = useState(true);
  const [isUserNameValid, checkUserName] = useState(true);
  const handleTitle = (titleValue: string) => {
    checkTitle(true);
    setTitle(titleValue);
  };

  const handleUserName = (userNameValue: string) => {
    checkUserName(true);
    setUserName(userNameValue);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!title) {
      checkTitle(false);
    }

    if (!userName) {
      checkUserName(false);
    }

    if (title && userName) {
      const allTodoId = visibleTodos.map(todo => todo.id);
      const todoId = Math.max(...allTodoId) + 1;

      const selectedUser = usersFromServer
        .find(user => user.name === userName) || null;

      if (selectedUser) {
        const newTodo: Todo = {
          id: todoId,
          title,
          completed: false,
          userId: selectedUser.id,
          user: selectedUser,
        };

        setTodos([
          ...visibleTodos,
          newTodo,
        ]);

        setTitle('');
        setUserName('');
      }
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={(event) => handleSubmit(event)}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={(event) => handleTitle(event.target.value)}
          />

          {!isTitleValid && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userName}
            onChange={(event) => handleUserName(event.target.value)}
          >
            <option value="" disabled>
              Choose a user
            </option>

            {usersFromServer.map((user) => (
              <option key={user.id}>{user.name}</option>
            ))}
          </select>

          {!isUserNameValid && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={visibleTodos} />
    </div>
  );
};
