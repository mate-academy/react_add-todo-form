import React, { useState } from 'react';
import classNames from 'classnames';
import './App.scss';
import './components/TodoList/TodoList.scss';

import users from './api/users';
import todos from './api/todos';
import { Todos, Users, PrepearedTodos } from './react-app-env';
import { TodoList } from './components/TodoList/TodoList';

const App: React.FC = () => {
  const prepearingTodos = (todosList : Todos[], usersList : Users[]) => {
    return todosList.map(todo => ({
      ...todo,
      user: usersList.find(user => todo.userId === user.id)?.name,
    }));
  };

  const prepearedTodos: PrepearedTodos[] = prepearingTodos(todos, users);

  const [currentTodos, setCurrentTodos] = useState(prepearedTodos);

  const [isValidTitle, setValidTitle] = useState(true);
  const [isValidUser, setValidUser] = useState(true);

  const [todoTitle, setTodoTitle] = useState('');
  const [todoUserId, setTodoUserId] = useState(0);
  const [todoIsCompleted, setIsCompleted] = useState(false);

  const handleSubmit = (event : React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const todoToAdd = {
      id: currentTodos.length + 1,
      title: todoTitle,
      userId: todoUserId,
      user: '',
      completed: todoIsCompleted,
    };

    if ((todoToAdd.title === '') || (!todoToAdd.userId)) {
      if (todoToAdd.title === '') {
        setValidTitle(false);
      }

      if (!todoToAdd.userId) {
        setValidUser(false);
      }
    } else {
      setCurrentTodos(prevTodos => [...prevTodos, todoToAdd]);
      setTodoTitle('');
      setTodoUserId(0);
    }
  };

  return (
    <div className="App">
      <form
        id="main_form"
        onSubmit={handleSubmit}
      >
        <label htmlFor="main_form-name">
          <input
            type="text"
            name="title"
            id="main_form-name"
            className={classNames({ not_valid: !isValidTitle })}
            placeholder="title"
            value={todoTitle}
            onChange={(event => {
              setTodoTitle(event.target.value);
              if (event.target.className === 'not_valid') {
                setValidTitle(true);
              }

              setTodoTitle(event.target.value);
            }
            )}
          />
          {(!isValidTitle && (
            <p className="error-text">
              Input is empty
            </p>
          ))}
        </label>
        <label htmlFor="userPick">
          <select
            name="user"
            id="userPick"
            value={todoUserId}
            className={classNames({ not_valid: !isValidUser })}
            onChange={(event => {
              setTodoUserId(Number(event.target.value));
              if (event.target.className === 'not_valid') {
                setValidUser(true);
              }
            }
            )}
          >
            <option
              id="default_option"
              value=""
            >
              Choose a user
            </option>
            {
              users.map(singleUser => (
                <option
                  key={singleUser.id}
                  value={singleUser.id}
                >
                  {singleUser.name}
                </option>
              ))
            }
          </select>
          {(!isValidUser && (
            <p className="error-text">
              User is empty
            </p>
          ))}
        </label>
        <div>
          <p>Completed</p>
          <label htmlFor="completed_true">
            True
            <input
              type="radio"
              name="completed"
              value="false"
              id="completed_true"
              onChange={() => {
                setIsCompleted(true);
              }}
            />
          </label>
          <label htmlFor="completed_false">
            False
            <input
              type="radio"
              name="completed"
              value="true"
              id="completed_false"
              onChange={() => {
                setIsCompleted(false);
              }}
              checked
            />
          </label>
        </div>
        <button
          type="submit"
        >
          Add
        </button>
      </form>
      <TodoList list={currentTodos} />
    </div>
  );
};

export default App;
