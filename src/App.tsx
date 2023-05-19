import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList/TodoList';

import { User } from './types/User';
import { Todos } from './types/Todos';

function combinedArray(userId: number): User | null {
  const foundUser = usersFromServer.find((user) => user.id === userId);

  return foundUser || null;
}

function InitialArray(): Todos[] {
  return todosFromServer.map(todo => ({
    ...todo,
    user: combinedArray(todo.userId),
  }));
}

export const App = () => {
  const [sectionValue, setSectionValue] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [CopyToDoList, setCopyToDoList] = useState<Todos[]>(InitialArray());

  const [titleState, setTitleState] = useState(false);
  const [selectState, setselectState] = useState(false);

  const addTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newId = Math.max(...CopyToDoList.map((elem) => elem.id));
    const userId = +sectionValue;

    const todo: Todos = {
      id: newId + 1,
      title: inputValue,
      completed: false,
      userId: 0,
      user: combinedArray(userId),
    };

    if (inputValue.length === 0) {
      setTitleState(true);
    }

    if (sectionValue.length === 0) {
      setselectState(true);
    }

    if (sectionValue.length > 0 && inputValue.length > 0) {
      setCopyToDoList([...CopyToDoList, todo]);
      setInputValue('');
      setSectionValue('');
      setTitleState(false);
      setselectState(false);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={addTodo}>
        <div className="field">
          <input
            placeholder="enter the title"
            type="text"
            data-cy="titleInput"
            value={inputValue}
            onChange={(event) => {
              setInputValue(event.target.value);
              setTitleState(false);
            }}
          />
          {titleState
          && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={sectionValue}
            onChange={(event) => {
              setSectionValue(event.target.value);
              setselectState(false);
            }}
          >
            <option value="" disabled>
              Choose a user
            </option>
            {usersFromServer.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
          {selectState
          && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <section className="TodoList">
        <TodoList todos={CopyToDoList} />
      </section>
    </div>
  );
};
