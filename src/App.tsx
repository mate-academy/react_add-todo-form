import React, { FormEvent, useState } from 'react';
import './App.scss';

import todosFromServer from './api/todos';
import usersFromServer from './api/users';

import { TodoList } from './components/TodoList/TodoList';

const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [todos, setTodos] = useState([...todosFromServer]);
  const [userError, setUserError] = useState(false);
  const [todoError, setTodoError] = useState(false);

  const changeTitleHandler = (value: string) => {
    setTodoError(false);
    setTitle(value);
  };

  const changeUserHandler = (value: number) => {
    setUserError(false);
    setUserId(value);
  };

  const addTodo = () => {
    if (!title || !userId) {
      setTodoError(!todoError);
      setUserError(!userError);

      return;
    }

    setTitle('');
    setUserId(0);

    const newTodo = {
      title,
      userId,
      id: Math.max(...todos.map(todo => todo.id)) + 1,
      completed: false,
    };

    setTodos((oldTodos) => ([
      ...oldTodos,
      newTodo,
    ]));
  };

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addTodo();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <form onSubmit={submitHandler}>
        <label
          htmlFor="title"
          className="label"
        >
          <input
            id="title"
            type="text"
            value={title}
            placeholder="Do something..."
            onChange={(event) => changeTitleHandler(event.target.value)}
          />
          {todoError && (
            <span className="label_danger">Please enter the titile</span>
          )}
        </label>
        <label htmlFor="select" className="label">
          <select
            id="select"
            name="user"
            value={userId}
            onChange={(event) => changeUserHandler(+event.target.value)}
          >
            <option value="">
              Choose person
            </option>
            {
              usersFromServer.map(item => (
                <option value={item.id}>
                  {item.name}
                </option>
              ))
            }
          </select>
          {userError && (
            <span className="label_danger">Please chose a user</span>
          )}
        </label>

        <button type="submit">
          Add todo
        </button>
      </form>

      <p>
        <TodoList todos={todos} />
      </p>
    </div>
  );
};

export default App;
