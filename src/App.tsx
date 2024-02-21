import { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './types';

const getNewId = (todos: Todo[]) => {
  return Math.max(...todos.map((todo) => todo.id)) + 1;
};

export const App = () => {
  const NEW_TODO = {
    id: 0,
    title: '',
    completed: false,
    userId: 0,
  };
  const titlePattern = /^[a-zA-Z0-9\u0400-\u04FF\s]*$/;

  const [todoList, setTodoList] = useState(todosFromServer);
  const [todo, setTodo] = useState(NEW_TODO);
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserError, setHasUserError] = useState(false);

  const onFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const newTodo = {
      ...todo,
      id: getNewId(todoList),
      title: todo.title.trim(),
    };

    setHasTitleError(!newTodo.title);
    setHasUserError(!newTodo.userId);

    if (!newTodo.title || !newTodo.userId) {
      return;
    }

    setTodoList((prevTodoList) => prevTodoList.concat(newTodo));
    setTodo(NEW_TODO);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={onFormSubmit}
      >
        <div className="field">
          <label htmlFor="title">Enter a title: </label>
          <input
            id="title"
            name="title"
            placeholder="Please enter a title"
            type="text"
            data-cy="titleInput"
            value={todo.title}
            onChange={(e) => {
              const newTitle = titlePattern.test(e.target.value)
                ? e.target.value
                : todo.title;

              setTodo((prevTodo) => ({
                ...prevTodo,
                title: newTitle,
              }));
              setHasTitleError((prevFlag) => prevFlag && !newTitle.trim());
            }}
          />
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={todo.userId}
            onChange={(e) => {
              const newUserId = +e.target.value;

              setTodo((prevTodo) => ({
                ...prevTodo,
                userId: newUserId,
              }));
              setHasUserError((prevFlag) => prevFlag && !newUserId);
            }}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map((user) => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {hasUserError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todoList} />
    </div>
  );
};
