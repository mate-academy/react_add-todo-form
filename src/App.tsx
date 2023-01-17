import './App.scss';
import {
  ChangeEvent, FC, FormEvent, useEffect, useState,
} from 'react';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { Errors } from './types/Errors';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';

export const App: FC = () => {
  const [title, setTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState(0);
  const [renderedTodos, setRenderedTodos] = useState<Todo[]>([]);
  const [renderedUsers] = useState([...usersFromServer]);
  const [errors, setErrors] = useState<Errors>({});

  const findUserById
    = (id: number) => renderedUsers.find(user => user.id === id);

  useEffect(() => {
    setRenderedTodos(todosFromServer.map(todo => ({
      ...todo,
      user: findUserById(todo.userId),
    })));
  }, []);

  const handleValidation = () => {
    let isFormValid = true;

    if (!title) {
      isFormValid = false;
      setErrors(prevState => ({
        ...prevState,
        title: 'Please enter a title',
      }));
    }

    if (!selectedUser || selectedUser < 1) {
      isFormValid = false;
      setErrors(prevState => ({
        ...prevState,
        select: 'Please choose a user',
      }));
    }

    return isFormValid;
  };

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setErrors(prevState => ({
      ...prevState,
      title: '',
    }));
    setTitle(event.currentTarget.value.replace(/[^a-zа-яA-zА-Я0-9 ]/ig, ''));
  };

  const handleSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    setErrors(prevState => ({
      ...prevState,
      select: '',
    }));
    setSelectedUser(+event.currentTarget.value);
  };

  const resetState = () => {
    setTitle('');
    setSelectedUser(0);
  };

  const addTodo = (event: FormEvent) => {
    event.preventDefault();

    if (!handleValidation()) {
      return;
    }

    const generateId
      = () => Math.max(...renderedTodos.map(todo => todo.id)) + 1;

    const newTodo = {
      id: generateId(),
      title,
      completed: false,
      userId: selectedUser,
      user: findUserById(selectedUser),
    };

    setRenderedTodos(renderedTodos.concat(newTodo));
    resetState();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={addTodo}
      >
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            id="title"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleInput}
          />
          <span className="error">{errors.title}</span>
        </div>

        <div className="field">
          <label htmlFor="select">User: </label>
          <select
            id="select"
            data-cy="userSelect"
            value={selectedUser}
            onChange={handleSelect}
          >
            <option
              value="0"
              disabled
            >
              Choose a user
            </option>
            {renderedUsers.map(user => (
              <option
                key={user.id}
                value={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>

          <span className="error">{errors.select}</span>
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <TodoList todos={renderedTodos} />
    </div>
  );
};
