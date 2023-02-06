import { FormEvent, ChangeEvent, useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './utiles/Todo';
import { getNewId } from './utiles/getNewId';
import { getUserbyId } from './utiles/getUserById';

const prepearedTodos:Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserbyId(usersFromServer, todo.userId),
}));

export const App = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [todos, setTodos] = useState(prepearedTodos);
  const [titleSetted, setTitleSetted] = useState(true);
  const [userNameSetted, setUserNameSetted] = useState(true);

  const addingNewTodo = () => {
    if (!title) {
      setTitleSetted(false);
    }

    if (!userId) {
      setUserNameSetted(false);
    }

    if (title && userId) {
      const newToDoId = getNewId(todos);
      const newTodoUSer = getUserbyId(usersFromServer, userId);
      const newTodo = new Todo(newToDoId, title, userId, newTodoUSer);

      setTodos((prevTodos) => ([
        ...prevTodos,
        newTodo,
      ]));

      setUserId(0);
      setTitle('');
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    addingNewTodo();
  };

  const handleImput = (event:ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleSetted(true);
  };

  const handleSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setUserNameSetted(true);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter tittle"
            value={title}
            onChange={handleImput}
          />

          {
            !titleSetted
            && (
              <span className="error">
                Please enter a title
              </span>
            )
          }
        </div>

        <div className="field">

          <select
            data-cy="userSelect"
            value={userId}
            onChange={handleSelect}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {
            !userNameSetted
            && (
              <span className="error">
                Please choose a user
              </span>
            )
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
