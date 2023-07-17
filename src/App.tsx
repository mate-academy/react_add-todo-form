import { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList/TodoList';

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(todosFromServer);

  const [title, setTitle] = useState('');
  const [hasTitleErr, setHasTitleErr] = useState(false);
  const [selectUserId, setSelectUserId] = useState(0);
  const [hasSelectErr, setHasSelectErr] = useState(false);

  const getBiggerId = (arrayItemsWithId: Todo[]) => {
    const maxId = Math.max(...arrayItemsWithId.map(item => item.id));

    return maxId + 1;
  };

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;

    if (/^[A-Za-zА-Яа-я0-9 ]*$/.test(text)) {
      setTitle(text);
    }

    if (text) {
      setHasTitleErr(false);
    }
  };

  const handleSelectUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectUserId(+event.target.value);
    if (+event.target.value !== 0) {
      setHasSelectErr(false);
    }
  };

  const reset = () => {
    setTitle('');
    setSelectUserId(0);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasTitleErr(!title);
    setHasSelectErr(selectUserId === 0);

    if (!title || selectUserId === 0) {
      return;
    }

    const newTodoId = getBiggerId(todos);
    const newTodo = {
      id: newTodoId,
      title,
      completed: false,
      userId: selectUserId,
    };

    setTodos(currentTodos => [...currentTodos, newTodo]);
    reset();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label htmlFor="input--title--add-todo-name">Title: </label>
          <input
            id="input--title--add-todo-name"
            placeholder="Enter a title"
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={handleTitle}
          />
          {hasTitleErr
            && (<span className="error"> Please enter a title</span>)}
        </div>

        <div className="field">
          <label htmlFor="select--user--add-todo-user">User: </label>
          <select
            id="select--user--add-todo-user"
            data-cy="userSelect"
            value={selectUserId}
            onChange={handleSelectUser}
          >
            <option key="0" value="0" disabled>Choose a user</option>

            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>

          {hasSelectErr
            && (<span className="error"> Please choose a user</span>)}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
