import './App.scss';
import { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import TodoList from './components/TodoList/TodoList';
import { User } from './Types/User';
import { Todo } from './Types/Todo';
import { getNewTodoId } from './components/utils/utils';

const initialTodos = todosFromServer;
const initialUsers = usersFromServer;

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const users: User[] = initialUsers;
  const [isTitleInvalid, setIsTitleInvalid] = useState(false);
  const [isUserValid, setIsUserValid] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newUser, setNewUser] = useState(0);

  const validFormUser = () => (newUser
    ? (setIsUserValid(false), false) : (setIsUserValid(true), true));

  const validFormTitle = () => (newTitle
    ? (setIsTitleInvalid(false), false) : (setIsTitleInvalid(true), true));

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
  };

  const reset = () => {
    setNewUser(0);
    setNewTitle('');
  };

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    validFormTitle();
    validFormUser();
    addTodo();
    if (!validFormTitle() && !validFormUser()) {
      reset();
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={submitHandler}>
        <div className="field">
          Title:
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={newTitle}
            onChange={(e) => {
              setNewTitle(e.target.value);
              setIsTitleInvalid(false);
            }}
          />
          {isTitleInvalid
          && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          User:
          <select
            data-cy="userSelect"
            value={newUser}
            onChange={(e) => {
              setNewUser(+e.target.value);
              setIsUserValid(false);
            }}
          >
            <option value="0" disabled>Choose a user</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {isUserValid && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">Add</button>
      </form>
      <TodoList todos={todos} users={users} />
    </div>
  );
};
