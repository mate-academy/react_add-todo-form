import { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todos';

const todosWithUsers = todosFromServer.map(todo => {
  const user = usersFromServer.find(({ id }) => (
    id === todo.userId
  ));

  return {
    ...todo,
    user,
  };
});

const getNewPostId = (todos: Todo[]): number => {
  const maxId: number = Math.max(...todos.map((todo) => todo.id));

  return maxId + 1;
};

export const App = () => {
  const [userId, setUserId] = useState(0);
  const [title, setTitle] = useState('');
  const [isErrorTitle, setIsErrorTitle] = useState(false);
  const [isErrorSelect, setIsErrorSelect] = useState(false);
  const [todos, setTodos] = useState<Todo[]>(todosWithUsers);

  const reset = () => {
    setTitle('');
    setUserId(0);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setIsErrorTitle(false);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setIsErrorSelect(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsErrorTitle(!title);
    setIsErrorSelect(!userId);

    if (!title) {
      return;
    }

    if (!userId) {
      return;
    }

    setTodos((prevTodos) => (
      [
        ...prevTodos,
        {
          id: getNewPostId(todos),
          title,
          completed: false,
          userId,
          user: usersFromServer.find(({ id }) => id === userId),
        },
      ]));

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
          <label htmlFor="title-id">
            <input
              type="text"
              data-cy="titleInput"
              id="title-id"
              value={title}
              onChange={handleTitleChange}
              placeholder="Enter a title"
            />
            {isErrorTitle && (
              <span className="error">Please enter a title</span>
            )}
          </label>
        </div>

        <div className="field">
          <label htmlFor="user-id">
            <select
              data-cy="userSelect"
              id="user-id"
              value={userId}
              onChange={handleSelectChange}
            >
              <option value="0" disabled>Choose a user</option>

              {usersFromServer.map(({ name, id }) => (
                <option value={`${id}`} key={id}>{name}</option>
              ))}
            </select>
            {isErrorSelect && (
              <span className="error">Please choose a user</span>
            )}
          </label>
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
