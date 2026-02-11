import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todos } from './types/Todos';
import { FormEventHandler, useEffect, useState } from 'react';
import { TodoList } from './components/TodoList';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todos[]>([]);
  const [title, setTitle] = useState<string>('');
  const [currentUser, setCurrentUser] = useState<number | string>('');
  const [errorTitle, setErrorTitle] = useState(false);
  const [errorUser, setErrorUser] = useState(false);

  const todosWithUsers = () => {
    return todosFromServer.map(todo => {
      const user = usersFromServer.find(el => el.id === todo.userId);

      return {
        ...todo,
        user,
      };
    });
  };

  const getMaxId = () => {
    let maxId = 0;

    for (const item of todos) {
      if (item.id > maxId) {
        maxId = item.id;
      }
    }

    return maxId + 1;
  };

  const addTitle = (val: string) => {
    setTitle(val);
    setErrorTitle(false);
  };

  const selectUser = (val: number | string) => {
    setCurrentUser(val);
    setErrorUser(false);
  };

  const addTodo: FormEventHandler = event => {
    event.preventDefault();

    if (title.length === 0) {
      setErrorTitle(true);
    }

    if (currentUser === 0) {
      setErrorUser(true);
    }

    if (title.length > 0 && currentUser !== 0) {
      const newTodo = {
        id: getMaxId(),
        title: title,
        completed: false,
        userId: Number(currentUser),
        user: usersFromServer.find(user => user.id === Number(currentUser)),
      };

      setTodos([...todos, newTodo]);
      setTitle('');
      setCurrentUser(0);
    }
  };

  useEffect(() => {
    setTodos(todosWithUsers());
  }, []);

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={event => addTodo(event)}
      >
        <div className="field">
          <label htmlFor="todo-title">Title</label>
          <input
            id="todo-title"
            type="text"
            data-cy="titleInput"
            value={title}
            placeholder="Enter a title"
            onChange={event => addTitle(event.target.value)}
          />
          {errorTitle === true && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="todo-user">User</label>
          <select
            id="todo-user"
            data-cy="userSelect"
            value={currentUser}
            onChange={event => selectUser(event.target.value)}
          >
            <option value="" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => {
              return (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              );
            })}
          </select>

          {errorUser === true && (
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
