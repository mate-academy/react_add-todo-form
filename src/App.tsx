import React, { FormEvent, ChangeEvent, useState } from 'react';
import './App.scss';
import 'bulma/css/bulma.min.css';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { getNewId } from './utiles/getNewId';
import { getUserbyId } from './utiles/getUserById';

const prepearedTodos:Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserbyId(usersFromServer, todo.userId),
}));

export const App = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [todos, setTodos] = useState<Todo[]>(prepearedTodos);
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
      const newTodo: Todo = {
        id: newToDoId,
        title,
        completed: false,
        userId,
        user: newTodoUSer,
      };

      setTodos((prevTodos:Todo[]) => ([
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
      <h1 className="title is-1">Add todo form</h1>
      <div className="box">
        <form onSubmit={handleSubmit}>
          <div className="field container">
            <input
              className="inputRestyle"
              type="text "
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

          <div className="field container">
            <select
              className="select inputRestyle"
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

          <button
            className="button is-dark is-rounded"
            type="submit"
            data-cy="submitButton"
          >
            Add
          </button>
        </form>
      </div>

      <TodoList todos={todos} />

    </div>
  );
};
