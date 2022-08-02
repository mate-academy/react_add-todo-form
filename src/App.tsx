import { useState } from 'react';
import { MergeTodosUsers } from './type/types';
import { TodoList } from './components/TodoList/TodoList';

import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

const preparedTodos: MergeTodosUsers[] = todosFromServer.map(todo => {
  const writer = usersFromServer.find(user => user.id === todo.userId);

  return {
    ...todo,
    user: writer,
  };
});

let generatedId = [...todosFromServer].sort((todo, nextTodo) => (
  todo.id - nextTodo.id))[0].id;

const add = (title: string, userName: string) => {
  generatedId += 1;

  const writer = usersFromServer.find(user => user.name === userName);
  const todo = {
    id: generatedId,
    title,
    completed: false,
    userId: 1,
    user: writer,
  };

  preparedTodos.push(todo);
};

export const App = () => {
  const [title, setTitle] = useState('');
  const [select, setSelect] = useState('');
  const [errorUser, setErrorUser] = useState(false);
  const [errorTitle, setErrorTitle] = useState(false);

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement
  | HTMLSelectElement>) => {
    if (event.target.name === 'title') {
      if (errorTitle) {
        setErrorTitle(false);
      }

      setTitle(event.target.value);
    } else {
      if (errorUser) {
        setErrorUser(false);
      }

      setSelect(event.target.value);
    }
  };

  return (
    <div className="App">
      <h1>Todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={(event) => {
          event.preventDefault();

          if (!title.trim() || !select) {
            if (!title.trim()) {
              setErrorTitle(true);
            }

            if (!select) {
              setErrorUser(true);
            }

            return;
          }

          add(title, select);
          setTitle('');
          setSelect('');
        }}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            name="title"
            value={title}
            placeholder="Title"
            onChange={inputHandler}
          />
          {errorTitle && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={select}
            onChange={inputHandler}
          >
            <option value="">Choose a user</option>
            {usersFromServer.map(selected => (
              <option
                key={selected.id}
                value={selected.name}
              >
                {selected.name}
              </option>
            ))}
          </select>
          {errorUser && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todoList={preparedTodos} />
    </div>
  );
};
