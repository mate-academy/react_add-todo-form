import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './components/types/Todo';
import React, { useState } from 'react';
import { TodoList } from './components/TodoList';

export const App = () => {
  const newTodos: Todo[] = todosFromServer.map(todo => ({
    ...todo,
    user: usersFromServer.find(user => todo.userId === user.id),
  }));

  const [todos, setTodos] = useState<Todo[]>(newTodos);
  const [disabled, setDisablet] = useState(false);

  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);

  const [select, setSelect] = useState(0);
  const [selectError, setSelectError] = useState(false);

  const handleAddNewTodo = (newTodo: Todo) => {
    setTodos(prevNewTodos => [...prevNewTodos, newTodo]);
  };

  const reset = () => {
    setTitle('');
    setSelect(0);
    setSelectError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (select === 0 && !title) {
      setSelectError(true);
      setTitleError(true);

      return;
    } else if (select === 0 && title !== '') {
      setSelectError(true);

      return;
    } else if (title === '' && select > 0) {
      setTitleError(true);

      return;
    }

    if (title !== '' && select > 0) {
      const newTodo: Todo = {
        id: Math.max(...usersFromServer.map(user => user.id)) + 1,
        title,
        completed: true,
        userId: select,
        user: usersFromServer.find(user => user.id === select),
      };

      handleAddNewTodo(newTodo);
      setSelect(0);
      setDisablet(false);
      reset();
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="title"
            name="title"
            value={title}
            onChange={event => {
              setTitle(event.target.value);
              setTitleError(false);
            }}
          />

          <span className="error">{titleError && 'Please enter a title'}</span>
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={select}
            onChange={event => {
              setSelect(+event.target.value);
              setSelectError(false);
              setDisablet(true);
            }}
          >
            <option value={0} disabled={disabled}>
              Choose a user
            </option>

            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          <span className="error">{selectError && 'Please choose a user'}</span>
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
