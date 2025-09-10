import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { FormEvent, useState } from 'react';
import { Todo } from './type/todo';

export const App = () => {
  const todosProccessed: Todo[] = todosFromServer.map(todo => {
    return {
      ...todo,
      user: usersFromServer.find(user => user.id === todo.userId)!,
    };
  });

  const [count, setCount] = useState(0);
  const [todos, setTodos] = useState<Todo[]>(todosProccessed);
  const [inputTouched, setInputTouched] = useState(false);
  const [selectTouched, setSelectTouched] = useState(false);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    let hasError = false;

    if (!title.trim()) {
      setInputTouched(true);
      hasError = true;
    }

    if (userId === 0) {
      setSelectTouched(true);
      hasError = true;
    }

    if (hasError) {
      return;
    }

    const maxId = todos.length ? Math.max(...todos.map(t => t.id)) : 0;
    const id = maxId + 1;

    const newTodo = {
      id,
      title: title.trim(),
      userId,
      completed: false,
      user: usersFromServer.find(user => user.id === userId)!,
    };

    setTodos(prevTodos => [...prevTodos, newTodo]);

    setCount(prevCount => prevCount + 1);
    setTitle('');
    setUserId(0);
    setInputTouched(false);
    setSelectTouched(false);
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        key={count}
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label htmlFor="titleInput">Title: </label>
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={event => {
              setTitle(event.target.value);
              setInputTouched(false);
            }}
            placeholder='Enter title (e.g. "Do the laundry")'
          />
          {inputTouched && !title.trim() && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User: </label>
          <select
            data-cy="userSelect"
            value={userId}
            onChange={event => {
              setUserId(+event.target.value);
              setSelectTouched(false);
            }}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {selectTouched && userId === 0 && (
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
