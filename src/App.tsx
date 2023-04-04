import './App.scss';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { useState } from 'react';
import { User } from './types/User';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function getUserById(userId: number): User | null {
  const user = usersFromServer.find((person) => person.id === userId);

  return user || null;
}

function getNextTodoId(todos: Todo[]): number {
  return Math.max(...todos.map((todo) => todo.id)) + 1;
}

export const initialTodos: Todo[] = [...todosFromServer].map((todo) => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [todos, setNewTodo] = useState(initialTodos);
  const [isHasTitle, setIsHasTitle] = useState(false);
  const [isUserIdInvalid, setIsUserIdInvalid] = useState(false);

  const resetForm = () => {
    setTitle('');
    setUserId(0);
    setIsHasTitle(false);
    setIsUserIdInvalid(false);
  };

  const handleFormSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newTodo: Todo = {
      id: getNextTodoId(todos),
      title,
      completed: false,
      userId,
      user: getUserById(userId),
    };

    if (!title.length || !userId) {
      setIsHasTitle(!title.length);
      setIsUserIdInvalid(!userId);

      return;
    }

    setNewTodo((prevTodos) => {
      const updatedTodos = [...prevTodos, newTodo];

      return updatedTodos;
    });

    resetForm();
  };

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setIsHasTitle(false);
  };

  const handleChangeSelected = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setUserId(Number(event.target.value));
    setIsUserIdInvalid(false);
  };

  return (
    <div className="App">
      <h1 className="App__title">Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleFormSubmit}
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

          {isHasTitle && (
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

          {isUserIdInvalid && (
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

      <TodoList todos={todos} />
    </div>
  );
};
