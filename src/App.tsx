import './App.scss';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { useState } from 'react';
import { User } from './types/User';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find((user) => user.id === userId);

  return foundUser || null;
}

function getMaximalId(todoes: Todo[]): number {
  return Math.max(...todoes.map((todo) => todo.id)) + 1;
}

export const todoesList: Todo[] = [...todosFromServer].map((todo) => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState<number>(0);
  const [todoes, setNewTodo] = useState(todoesList);
  const [isHaveTitle, setIsHaveTitle] = useState(false);
  const [isHaveUserId, setIsHaveUserId] = useState(false);

  const resetState = () => {
    setTitle('');
    setUserId(0);
    setIsHaveTitle(false);
    setIsHaveUserId(false);
  };

  const addNewTodo = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newTodo: Todo = {
      id: getMaximalId(todoes),
      title,
      completed: false,
      userId,
      user: getUser(userId),
    };

    if (!title.length) {
      setIsHaveTitle(true);
    }

    if (!userId) {
      setIsHaveUserId(true);
    }

    if (title.length && userId) {
      setNewTodo([...todoes, newTodo]);

      resetState();
    }
  };

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setIsHaveTitle(false);
  };

  const handleChangeSelected = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setUserId(Number(event.target.value));
    setIsHaveUserId(false);
  };

  return (
    <div className="App">
      <h1 className="App__title">Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={addNewTodo}
      >
        <div className="field">
          <Form.Control
            id="title"
            placeholder="Enter a title"
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={handleChangeInput}
          />

          {isHaveTitle && (
            <span className="error">
              Please enter a title
            </span>
          )}
        </div>

        <div className="field">
          <Form.Select
            data-cy="userSelect"
            value={Number(userId)}
            onChange={handleChangeSelected}
          >

            <option disabled value={0}>
              Choose a user
            </option>

            {usersFromServer.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </Form.Select>

          {isHaveUserId && (
            <span className="error">
              Please choose a user
            </span>
          )}
        </div>

        <Button
          variant="outline-success"
          type="submit"
          data-cy="submitButton"
        >
          Add
        </Button>
      </form>

      <TodoList todos={todoes} />
    </div>
  );
};
