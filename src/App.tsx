import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';
import { TodoList } from './components/TodoList';

export const App = () => {
  const [selectTitleValue, setSelectTitleValue] = useState("");
  const [selectedOptionValue, setselectedOptionValue] = useState(0);
  const [addIsCliked, setAddIsCliked] = useState(false);
  const [todos, setTodos] = useState(todosFromServer);
  const [freeIdOfTodo, setFreeIdOfTodo] = useState(Math.max(...todosFromServer.map(todo => todo.id)) + 1);

  const listOfUsers = usersFromServer.map(user => {
    return user['name'];
  });

  const addTodos = () => {
    const foundUser = usersFromServer.find(user => user.name === listOfUsers[selectedOptionValue]);
    const userIdOfNewTodo = foundUser ? foundUser.id : 0;

    const newTodo = {
      id: freeIdOfTodo,
      title: selectTitleValue,
      completed: false,
      userId: userIdOfNewTodo,
    }

    setTodos([...todos, newTodo]);
    setFreeIdOfTodo(freeIdOfTodo + 1);
  }

  const renderNewPage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    setAddIsCliked(true);
    if (selectTitleValue && selectedOptionValue) {
      addTodos();
      setSelectTitleValue("");
      setselectedOptionValue(0);
      setAddIsCliked(false);
    }
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST">
        <div className="field">
          <label>
            Title:&nbsp;&nbsp;
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={selectTitleValue}
              onChange={event => {
                setSelectTitleValue(event.target.value);
              }}
            />
          </label>
          {(!selectTitleValue && addIsCliked) &&
            <span className="error">Please enter a title</span>
          }
        </div>

        <div className="field">
          <label>
            User:&nbsp;&nbsp;
            <select
              data-cy="userSelect"
              value={selectedOptionValue}
              onChange={event => {
                setselectedOptionValue(+event.target.value);
              }}
            >
              <option value="0" disabled>Choose a user</option>
              {
                listOfUsers.map((user, index) => (
                  <option
                    value={index}
                    key={user}
                  >
                    {user}
                  </option>
                ))
              }
            </select>
          </label>
          {(!selectedOptionValue && addIsCliked) &&
            <span className="error">Please choose a user</span>
          }
        </div>

        <button
          value="add"
          type="submit"
          data-cy="submitButton"
          onClick={renderNewPage}
        >
          Add
        </button>
      </form>

      <TodoList
        todos={todos}
      />
    </div>
  );
};
