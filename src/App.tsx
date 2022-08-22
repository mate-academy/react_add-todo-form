import './App.scss';

import { FormEvent, useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { User } from './types/User';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList/TodoList';

function getUserById(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

let maxId = [...todosFromServer].sort((a, b) => b.id - a.id)[0].id;

const addTodo = (todo: string, userId: number) => {
  maxId += 1;

  const todoAdd = {
    id: maxId,
    completed: false,
    title: todo,
    userId,
    user: getUserById(userId),
  };

  return todoAdd;
};

export const App = () => {
  const [toDo, setToDo] = useState('');
  const [user, setUser] = useState('');
  const [errorToDo, setErrorToDo] = useState(false);
  const [errorUser, setErrorUser] = useState(false);
  const [todoList, setTodoList] = useState(todos);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (toDo.trim().length === 0) {
      setErrorToDo(true);
    }

    if (Number(user) === 0) {
      setErrorUser(true);

      return;
    }

    if (toDo.trim().length > 0 && Number(user) !== 0) {
      setTodoList((prevTodoList) => (
        [...prevTodoList, addTodo(toDo, Number(user))]));
      setToDo('');
      setUser('');
      setErrorToDo(false);
      setErrorUser(false);
    }
  };

  return (
    <div className="App">
      <h1 className="App__title">Add todo for users</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label className="field__label">
            <p className="form__title"> Title: </p>
            <input
              className="field__form"
              type="text"
              data-cy="titleInput"
              value={toDo}
              onChange={(event) => {
                setToDo(event.target.value);

                if (errorToDo) {
                  setErrorToDo(false);
                }
              }}
            />
          </label>
          {errorToDo
            && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <p className="form__title"> Users: </p>
          <select
            className="field__form"
            data-cy="userSelect"
            name="user"
            value={user}
            onChange={(event) => {
              setUser(event.target.value);

              if (errorUser) {
                setErrorUser(false);
              }
            }}
          >
            <option value="0">Choose a user</option>
            {usersFromServer.map(({ id, name }) => (
              <option value={id} key={id}>{name}</option>
            ))}
          </select>
          {errorUser
            && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton" className="button">
          Add
        </button>
      </form>

      <TodoList todos={todoList} />
    </div>
  );
};
