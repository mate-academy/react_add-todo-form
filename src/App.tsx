import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';
import TodoList from './components/TodoList/TodoList';

export interface Todo {
  id: number,
  title: string,
  completed: boolean,
  userId: number,
}

export interface User {
  id: number,
  name: string,
  username: string,
  email: string,
}

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(todosFromServer);
  const users: User[] = usersFromServer;
  const [emptyTitle, setEmptyTitle] = useState(false);
  const [emptyUser, setEmptyUser] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newUser, setNewUser] = useState(0);


    const addTodo = () => {
      if (!validFormTitle() && !validFormUser()) {
        const newTodo = {
          id: getNewTodoId(todos),
          title: newTitle,
          userId: newUser,
          completed: false,
        };

        setTodos([...todos, newTodo]);
      }
    }

    function getNewTodoId(todos: Todo[]) {
      const maxId = Math.max(...todos.map(todo => todo.id));

      return maxId + 1;
    }

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    validFormTitle();
    validFormUser();
    addTodo();
    reset();
  }

  const validFormUser = () => {
    if (newUser) {
      return setEmptyUser(false), false;
    } else {
      return setEmptyUser(true), true;
    }
  }

  const validFormTitle = () => {
    if (newTitle) {
      return setEmptyTitle(false), false;
    } else {
      return setEmptyTitle(true), true;
    }
  }

  const reset = () => {
    if (validFormTitle()) {
      setNewTitle('');
    }
    if (validFormUser()) {
      setNewUser(0);
    }
    if (!validFormTitle() && !validFormUser()) {
      setNewUser(0);
      setNewTitle('');
    }
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
      action="/api/todos"
      method="POST"
      onSubmit={submitHandler}
      >

        <div className="field">
        Title: <input
          type="text"
          data-cy="titleInput"
          placeholder="Enter a title"
          value={newTitle}
          onChange={(e) => {
            setNewTitle(e.target.value);
            setEmptyTitle(false)
            ;
          }}
        />
          {emptyTitle
              && (
                <span className="error">
                  Please enter a title
                </span>
              )}
        </div>

        <div className="field">
      User:
      <select
        data-cy="userSelect"
        value={newUser}
        onChange={(e) => {
          setNewUser(+e.target.value);
          setEmptyUser(false)
        }}
      >
       <option value="0" disabled>Choose a user</option>
        {users
          .map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
      ))}
      </select>

        {emptyUser && (
          <span className="error">Please choose a user</span>
        )}
        </div>

        <button
        type="submit"
        data-cy="submitButton"
        >
          Add
        </button>
      </form>
      <TodoList todos={todos} users={users} />
    </div>
  );
};
