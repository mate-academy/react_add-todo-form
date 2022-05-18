import React, { useState, useMemo } from 'react';
import './App.scss';
import { Todos } from './types/Todo';
import { TodoList } from './components/TodoList';

import users from './api/users';
import todos from './api/todos';

const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [user, setUser] = useState('');
  const [todo, setTodo] = useState(todos);
  const [isCompleted, setIsCompleted] = useState('not completed');
  const [isErrorTitle, setIsErrorTitle] = useState<string | null>(null);
  const [isErrorUser, setIsErrorUser] = useState<string | null>(null);

  const hangleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = event.target.value;

    setTitle(newTitle.split('').splice(0).join(''));
    setIsErrorTitle(null);
  };

  const validateMessage = () => {
    if (!user) {
      setIsErrorUser('Please choose a user!');
    }

    if (!title.trim()) {
      setIsErrorTitle('Please enter the title!');
    }

    if (!user || !title.trim()) {
      return false;
    }

    return true;
  };

  const newTodos = (
    arrTodo: Omit<Todos, 'user'>[],
  ) => arrTodo.map((itemTodo) => ({
    ...itemTodo,
    user: users.find((itemUser) => itemUser.id === itemTodo.userId),
  }));

  const preparedTodos: Todos[] = useMemo(() => newTodos(todo), [todo]);

  const addTodo = (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (validateMessage()) {
      const searchingUser = users.find(({ name }) => name === user);

      const newTodo = {
        id: todo[todo.length - 1].id + 1,
        title,
        userId: searchingUser ? searchingUser.id : 0,
        completed: isCompleted === 'completed',
      };

      setTodo((current) => [...current, newTodo]);
      setTitle('');
      setUser('');
      setIsCompleted('not completed');

      window.scrollTo(0, document.documentElement.clientHeight);
    }
  };

  return (
    <div className="App">

      <form onSubmit={addTodo} className="App__form">
        <h2>Add todo:</h2>

        <div className="App__items">
          <div>
            <label>
              <input
                type="text"
                name="title"
                value={title}
                placeholder="Title"
                minLength={5}
                onChange={hangleTitle}
                className="App__input"
              />
            </label>
            {isErrorTitle
              && <div className="App__error">{isErrorTitle}</div>}
          </div>
          <div>
            <select
              name="user"
              value={user}
              onChange={event => {
                setUser(event.target.value);
                setIsErrorUser(null);
              }}
              className="App__input"
            >
              <option value="">Choose a user</option>
              {users.map(({ name, id }) => (
                <option key={id} value={name}>{name}</option>
              ))}
            </select>
            {isErrorUser && <div className="App__error">{isErrorUser}</div>}
          </div>

          <div className="App__input-radio">
            <label htmlFor="not__completed">
              Not completed
            </label>
            <input
              type="radio"
              id="not__completed"
              name="status"
              value="not completed"
              checked={isCompleted === 'not completed'}
              onChange={event => {
                setIsCompleted(event.target.value);
              }}
            />

            <label htmlFor="completed">
              Completed
            </label>
            <input
              type="radio"
              id="completed"
              name="status"
              value="completed"
              checked={isCompleted === 'completed'}
              onChange={event => setIsCompleted(event.target.value)}
            />
          </div>
        </div>

        <button type="submit" className="App__button">Add</button>
      </form>

      <div>
        <h1 className="App__title">Static list of todos</h1>
        <TodoList preparedTodos={preparedTodos} />
      </div>
    </div>

  );
};

export default App;
