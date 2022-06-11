import {
  FC,
  FormEvent,
  useState,
} from 'react';
import './App.css';

import users from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';

const App: FC = () => {
  const [todos, setTodos] = useState(todosFromServer);
  const [title, setTitle] = useState('');
  const [user, setUser] = useState('');
  const [errorMessageForTitle, setErrorMessageForTitle] = useState('');
  const [errorMessageForUser, setErrorMessageForeUser] = useState('');

  const isValidInput = () => {
    switch (true) {
      case !(title.trim()):
        setErrorMessageForTitle('Please enter a title!');

        return false;

      case !user:
        setErrorMessageForeUser('Please choose a user!');

        return false;

      default:
        return true;
    }
  };

  const submitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let todosAdded = 0;

    if (isValidInput()) {
      const currUser = users.find(({ name }) => name === user);

      const newTodo = {
        id: todos.length + 1,
        title,
        userId: currUser ? currUser.id : 0,
        completed: false,
      };

      setTodos([...todos, newTodo]);

      todosAdded += 1;
    }

    if (todosAdded) {
      setTitle('');
      setUser('');
    }
  };

  const handleUser = (currentUser: string) => {
    setUser(currentUser);
    setErrorMessageForeUser('');
  };

  const handleTitle = (currentTitle: string) => {
    const allowedCharacters = /[^A-Za-zА-Яа-яёЁ0-9 ]/g;

    setTitle(currentTitle.replace(allowedCharacters, ''));
    setErrorMessageForTitle('');
  };

  const assignedTodos: Todo[] = todos.map((todo) => ({
    ...todo,
    user: users.find((person) => person.id === todo.userId),
  }));

  return (
    <div className="app">
      <h1 className="app__title">Add todo form</h1>

      <form
        method="post"
        name="addTodos"
        className="app__form"
        onSubmit={submitForm}
      >
        <label className="app__label">
          <input
            type="text"
            name="title"
            value={title}
            placeholder="Title"
            className="app__input"
            onChange={({ target }) => {
              handleTitle(target.value);
            }}
          />
          <span className="app__error-message">{errorMessageForTitle}</span>
        </label>

        <label className="app__label">
          <select
            name="users"
            value={user}
            className="app__select"
            onChange={({ target }) => {
              handleUser(target.value);
            }}
          >
            <option value="">
              Choose a user
            </option>
            {
              users.map(({ name, id }) => (
                <option
                  key={id}
                  value={name}
                >
                  {name}
                </option>
              ))
            }
          </select>
          <span className="app__error-message">{errorMessageForUser}</span>
        </label>

        <button
          type="submit"
          name="submit"
          className="app__submit"
        >
          Add
        </button>
      </form>

      <TodoList todos={assignedTodos} />
    </div>
  );
};

export default App;
