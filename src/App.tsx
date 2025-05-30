import './App.scss';

import todosFromServer from './api/todos';
import usersFromServer from './api/users';
import { useState } from 'react';
import { TodoList } from './components/TodoList';
import { User } from './entities/User';
import { Todo } from './entities/Todo';

const getUsers: User[] = usersFromServer;
const getUserById = (userId: number): User | null =>
  getUsers.find(user => user.id === userId) || null;
const getTodos: Todo[] = todosFromServer.map(todo => {
  const todoUser: User | null = getUserById(todo.userId);

  return {
    ...todo,
    user: todoUser,
  };
});

export const App = () => {
  const [todoTitle, setTodoTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [todos, setTodos] = useState(getTodos);
  const [isTitleError, setIsTitleError] = useState(false);
  const [isUserError, setIsUserError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(event.target.value);
    if (event.target.value) {
      setIsTitleError(false);
    } else {
      setIsTitleError(true);
    }
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    if (event.target.value) {
      setIsUserError(false);
    } else {
      setIsUserError(true);
    }
  };

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!todoTitle || !userId) {
      if (!todoTitle) {
        setIsTitleError(true);
      }

      if (!userId) {
        setIsUserError(true);
      }

      return;
    }

    let maxTodoId = 1;

    for (let i = 0; i < todos.length; i++) {
      if (todos[i].id > maxTodoId) {
        maxTodoId = todos[i].id;
      }
    }

    const newTodo: Todo = {
      id: maxTodoId + 1,
      title: todoTitle,
      completed: false,
      userId: userId,
      user: getUserById(userId),
    };

    setTodos([...todos, newTodo]);
    setTodoTitle('');
    setUserId(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleOnSubmit}>
        <div className="field">
          <label htmlFor="titleInput">Title:&nbsp;&nbsp;</label>
          <input
            id="titleInput"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            onChange={handleTitleChange}
            value={todoTitle}
          />
          {isTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User:&nbsp;&nbsp;</label>
          <select
            id="userSelect"
            data-cy="userSelect"
            onChange={handleUserIdChange}
            value={userId}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {getUsers.map(user => {
              return (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              );
            })}
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
