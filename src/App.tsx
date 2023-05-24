import React, { useState, ChangeEvent } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList/TodoList';

import { User } from './types/User';
import { Todo } from './types/Todo';

function getUserById(userId: number): User | null {
  const foundUser = usersFromServer.find((user) => user.id === userId);

  return foundUser || null;
}

const startingArray: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [sectionValue, setSectionValue] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [todoList, setToDoList] = useState<Todo[]>(startingArray);

  const [titleState, setErrorTitleState] = useState(false);
  const [selectState, setErrorSelectState] = useState(false);

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSectionValue(event.target.value);
    setErrorSelectState(false);
  };

  const resetForm = () => {
    setInputValue('');
    setSectionValue('');
    setErrorTitleState(false);
    setErrorSelectState(false);
  };

  const addTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newId = Math.max(...todoList.map((elem) => elem.id));
    const userId = +sectionValue;

    const todo: Todo = {
      id: newId + 1,
      title: inputValue,
      completed: false,
      userId: 0,
      user: getUserById(userId),
    };

    if (inputValue.length === 0) {
      setErrorTitleState(true);
    }

    if (sectionValue.length === 0) {
      setErrorSelectState(true);
    }

    if (sectionValue.length > 0 && inputValue.length > 0) {
      setToDoList([...todoList, todo]);
      resetForm();
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
              setErrorTitleState(false);
            }}
          />
          {titleState
          && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={sectionValue}
            onChange={handleSelectChange}
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

      <TodoList todos={todoList} />

    </div>
  );
};
