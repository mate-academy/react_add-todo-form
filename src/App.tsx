import React, { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';
import { TodoWithPerson, Person } from './type';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function getUser(userId: number): Person | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

const todos: TodoWithPerson[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App:React.FC = () => {
  const [todosList] = useState([...todos]);
  const [addTodoTitle, setTodoTitle] = useState('');
  const [personID, setPerson] = useState(0);
  const [setNotValidPerson, setErrorUser] = useState(false);
  const [errorTittle, setErrorTittle] = useState(false);

  let startId = 0;

  todosList.forEach(todo => {
    startId = (todo.id > startId)
      ? todo.id
      : startId;
  });

  const handleTodoTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(event.target.value);
    setErrorTittle(false);
  };

  const handlePersonIDSelect = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setPerson(Number(event.target.value));
    setErrorUser(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!addTodoTitle.trim() || !personID) {
      setErrorTittle(!addTodoTitle.trim());
      setErrorUser(!personID);

      return;
    }

    if (!setNotValidPerson && !errorTittle) {
      startId += 1;
      const addTodo = {
        id: startId,
        title: addTodoTitle,
        completed: false,
        userId: personID,
        user: getUser(personID),
      };

      todosList.push(addTodo);

      setTodoTitle('');
      setPerson(0);
      setErrorUser(false);
      setErrorTittle(false);
    }
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
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Please enter a title"
            value={addTodoTitle}
            onChange={handleTodoTitle}
          />

          {errorTittle && <span className="error">Please enter a title</span>}

        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            placeholder="Please enter a title"
            value={personID}
            onChange={handlePersonIDSelect}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>{user.name}</option>
            ))}
          </select>

          {setNotValidPerson
            && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todosList} />
    </div>
  );
};
