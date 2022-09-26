import { useState } from 'react';
import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { User } from './types/User';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

const getUser = (userId: number): User | null => usersFromServer
  .find(user => user.id === userId) || null;

const visibleTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

let maxTodoId = Math.max(...visibleTodos.map(todo => todo.id));

export const App = () => {
  const [title, setTitle] = useState('');
  const [isTitleCorrect, setIsTitleCorrect] = useState(true);
  const [userId, setUserId] = useState(0);
  const [isUserCorrect, setIsUserCorrect] = useState(true);

  const getTodo = (): void => {
    maxTodoId += 1;

    const newTodo: Todo = {
      id: maxTodoId,
      title,
      completed: false,
      userId,
      user: getUser(userId),
    };

    visibleTodos.push(newTodo);
  };

  const resetForm = ():void => {
    setIsTitleCorrect(true);
    setIsUserCorrect(true);
    setUserId(0);
    setTitle('');
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim()) {
      setIsTitleCorrect(false);
    }

    if (!userId) {
      setIsUserCorrect(false);
    }

    if (!userId || !title.trim()) {
      // eslint-disable-next-line no-useless-return
      return;
    }

    getTodo();
    resetForm();
  };

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const initialValue = event.target.value;

    const value = (
      initialValue.match(/^[а-яА-ЯёЁіІїЇa-zA-Z0-9\s]+$/)
      || [...initialValue
        .split('')
        .slice(0, initialValue.length - 1)]
    ).join('');

    setTitle(value);
    setIsTitleCorrect(true);
  };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(Number(event.target.value));
    setIsUserCorrect(true);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label htmlFor="titleInput">Title: </label>
          <input
            type="text"
            id="titleInput"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitle}
          />
          {isTitleCorrect
            || <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User: </label>
          <select
            id="userSelect"
            data-cy="userSelect"
            value={userId}
            onChange={handleSelect}
          >
            <option value="0" disabled>Choose a user</option>

            {usersFromServer.map(({ name, id }) => (
              <option value={id} key={id}>{name}</option>
            ))}
          </select>

          {isUserCorrect || <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={visibleTodos} />
    </div>
  );
};
