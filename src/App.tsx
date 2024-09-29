import { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';

import todosFromServer from './api/todos';
import usersFromServer from './api/users';
import { Todo } from './types/Todo';

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(todosFromServer);
  const [todo, setTodo] = useState({
    id: 0,
    title: '',
    completed: false,
    userId: 0,
  });

  const countMaxId: number = todos.reduce(
    (max, curr) => (curr.id > max ? curr.id : max),
    todos[0].id,
  );

  const [isUserChosen, setIsUserChosen] = useState(true);
  const [isTitleEntered, setIsTitleEntered] = useState(true);
  const [maxId, setMaxId] = useState(countMaxId + 1);

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setMaxId(countMaxId + 1);

    setTodo(prevTodo => ({
      ...prevTodo,
      title: event.target.value,
      id: maxId,
    }));

    setIsTitleEntered(true);
  }

  function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setTodo(prevTodo => ({
      ...prevTodo,
      userId: +event.target.value,
    }));

    setIsUserChosen(true);
  }

  const handleReset = () => {
    setTodo({
      id: 0,
      title: '',
      completed: false,
      userId: 0,
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!todo.title) {
      setIsTitleEntered(false);
    }

    if (!todo.userId) {
      setIsUserChosen(false);
    }

    if (!todo.title || !todo.userId) {
      return;
    }

    setTodos(prevTodos => [...prevTodos, todo]);

    handleReset();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={todo.title}
            onChange={event => handleInputChange(event)}
          />
          {!isTitleEntered && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={todo.userId}
            onChange={event => handleSelectChange(event)}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {!isUserChosen && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
