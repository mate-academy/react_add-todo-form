import React, { useState } from 'react';
import todosFromServer from './api/todos';
import usersFromServer from './api/users';
import { PreparedTodo } from './types/PreparedTodo';
import { User } from './types/User';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList/TodoList';
import './App.scss';

const App: React.FC = () => {
  const users: User[] = usersFromServer;
  const [todos, setTodos] = useState<Todo[]>(todosFromServer);
  const defaultNewTodo = {
    userId: 0,
    title: '',
    completed: false,
  };

  const [newTodo, setNewTodo] = useState({ ...defaultNewTodo });

  const [isUserValid, setIsUserValid] = useState(true);
  const [isTextValid, setIsTextValid] = useState(true);

  const isNewTodoDataValid = () => {
    let isDataValid = true;

    if (newTodo.userId === 0) {
      setIsUserValid(false);

      isDataValid = false;
    }

    if (newTodo.title === '') {
      setIsTextValid(false);

      isDataValid = false;
    }

    return isDataValid;
  };

  const handleChange = (key: string, value: string | number) => {
    setNewTodo(prevTodo => ({
      ...prevTodo,
      [key]: value,
    }));
  };

  const handleAddClick = () => {
    if (!isNewTodoDataValid()) {
      return;
    }

    setTodos(prevTodos => [
      ...prevTodos,
      {
        id: prevTodos[prevTodos.length - 1].id + 1,
        ...newTodo,
      },
    ]);

    setNewTodo({ ...defaultNewTodo });
    setIsUserValid(true);
    setIsTextValid(true);
  };

  const prepareTodos = (rawTodos: Todo[]): PreparedTodo[] => (
    rawTodos.map(todo => ({
      ...todo,
      user: usersFromServer.find(user => user.id === todo.userId) || null,
    }))
  );

  const handeStatusChange = (id: number) => (
    setTodos(prev => (
      prev.map(todo => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        }

        return todo;
      })
    ))
  );

  return (
    <div className="app">
      <h1 className="app__title">Add todo form</h1>

      <form className="app__form">
        <label className="app__input-group">
          {!isTextValid && (
            <span className="app__input-error">
              Please enter the title ⚠️
            </span>
          )}

          <span className="app__label-text">
            Todo text:
          </span>

          <input
            name="title"
            type="text"
            data-cy="titleInput"
            className="input"
            value={newTodo.title}
            onChange={event => {
              handleChange(event.target.name, event.target.value);
              setIsTextValid(true);
            }}
            placeholder="Input Todo text here"
          />
        </label>

        <label className="app__input-group">
          {!isUserValid && (
            <span className="app__input-error">
              Please choose a user ⚠️
            </span>
          )}

          <span className="app__label-text">
            Choose User:
          </span>

          <div className="select">
            <select
              name="userId"
              data-cy="userSelect"
              value={newTodo.userId}
              onChange={event => {
                handleChange(event.target.name, +event.target.value);
                setIsUserValid(true);
              }}
            >
              <option value="0" disabled>Choose a user</option>

              {users.map(({ id, name, username }) => (
                <option key={id} value={id}>
                  {`${name} [${username}]`}
                </option>
              ))}
            </select>
          </div>
        </label>

        <button
          type="button"
          className="button is-primary"
          onClick={handleAddClick}
        >
          Add
        </button>
      </form>

      <TodoList
        todos={prepareTodos(todos)}
        onStatusClick={handeStatusChange}
      />
    </div>
  );
};

export default App;
