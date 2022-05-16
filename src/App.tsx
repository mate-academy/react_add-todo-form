import React, { useState, useMemo } from 'react';
import './App.scss';
import { Todos } from './types/Todos';
import { TodoList } from './components/TodoList/TodoList';

import users from './api/users';
import todos from './api/todos';

const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [user, setUser] = useState('');
  const [todo, setTodo] = useState(todos);
  const [isCompleted, setIsCompleted] = useState('not completed');
  const [errorTitle, setErrorTitle] = useState<string | null>(null);
  const [errorUser, setErrorUser] = useState<string | null>(null);

  const hangleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = event.target.value;

    setTitle(newTitle.split('').splice(0).join(''));
    setErrorTitle(null);
  };

  const validate = () => {
    if (!user) {
      setErrorUser('Please choose a user');
    }

    if (!title.trim()) {
      setErrorTitle('Please enter the title');
    }

    if (!user || !title.trim()) {
      return false;
    }

    return true;
  };

  const addTodo = (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (validate()) {
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

  const newArr = (arrTodo: Omit<Todos, 'user'>[]) => arrTodo.map((oneTodo) => ({
    ...oneTodo,
    user: users.find((oneUser) => oneUser.id === oneTodo.userId),
  }));

  const preparedTodos: Todos[] = useMemo(() => newArr(todo), [todo]);

  return (
    <div className="App">

      <TodoList todos={preparedTodos} />

      <form onSubmit={addTodo} className="App__form">
        <h3 className="App__form-title">Create a new todo</h3>

        <div className="App__form-fields">
          <div className="App__input-title">
            <label>
              <input
                type="text"
                name="title"
                value={title}
                placeholder="Title"
                onChange={hangleTitle}
                className="App__input"
              />
            </label>
            {errorTitle && <span className="App__error">{errorTitle}</span>}
          </div>

          <div className="App__input-select">
            <select
              name="user"
              value={user}
              onChange={event => {
                setUser(event.target.value);
                setErrorUser(null);
              }}
              className="App__input"
            >
              <option value="">Choose a user</option>
              {users.map(({ name, id }) => (
                <option key={id} value={name}>{name}</option>
              ))}
            </select>
            {errorUser && <span className="App__error">{errorUser}</span>}
          </div>

          <div className="App__input-radio">
            <label
              className="App__radio-label"
              htmlFor="not__completed"
            >
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
              className="App__radio"
            />

            <label
              className="App__radio-label"
              htmlFor="completed"
            >
              Completed
            </label>
            <input
              type="radio"
              id="completed"
              name="status"
              value="completed"
              checked={isCompleted === 'completed'}
              onChange={event => setIsCompleted(event.target.value)}
              className="App__radio"
            />
          </div>
        </div>

        <button type="submit" className="App__button">Add</button>
      </form>
    </div>
  );
};

export default App;
