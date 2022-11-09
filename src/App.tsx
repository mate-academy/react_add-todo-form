import React, { useState } from 'react';
import './App.scss';
import { Todo } from './types/Todo';
import { FullTodo } from './types/FullTodo';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

const fullTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: usersFromServer.find(user => user.id === todo.userId),
}));

export const App: React.FC = () => {
  const [todos, setTodos] = useState(fullTodos);
  const [title, setTitle] = useState('');
  const [submit, setSubmit] = useState(false);
  const [userId, setUserId] = useState(0);

  function biggestID() {
    let biggest = 0;

    todos.forEach(todo => {
      if (todo.id > biggest) {
        biggest = todo.id;
      }
    });

    return biggest + 1;
  }

  const addTodo = () => {
    const newTodo: FullTodo = {
      id: biggestID(),
      title,
      completed: false,
      userId,
      user: usersFromServer.find(user => user.id === userId),
    };

    setTodos((state => (
      [...state, newTodo]
    )));
  };

  const resetForm = () => {
    setSubmit(false);
    setTitle('');
    setUserId(0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmit(true);

    if (title.trim() && userId) {
      addTodo();
      resetForm();
    }
  };

  const handlerTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handlerUser = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+e.target.value);
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
          <label>
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={handlerTitle}
            />
            {
              submit && !title
              && (<span className="error">Please enter a title</span>)
            }
          </label>
        </div>

        <div className="field">
          <label>
            <select
              data-cy="userSelect"
              value={userId}
              onChange={handlerUser}
            >
              <option value="0" disabled>Choose a user</option>
              {usersFromServer.map(person => (
                <option key={person.id} value={person.id}>
                  {person.name}
                </option>
              ))}
            </select>

            {
              submit && !userId
              && (<span className="error">Please choose a user</span>)
            }
          </label>
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
