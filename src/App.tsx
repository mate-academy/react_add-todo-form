import { useState } from 'react';
import './App.scss';

import todosFromServer from './api/todos';
import usersFromServer from './api/users';
import { TodoList } from './components/TodoList';

export const App = () => {
  const [listOfToDos, setListOfToDos] = useState(todosFromServer);
  const [selectedUser, setSelectedUser] = useState('-1');
  const [userError, setUserError] = useState(false);
  const [inputTitle, setInputTitle] = useState('');
  const [titleError, setTitleError] = useState(false);
  const ToDosWithUsers = listOfToDos.map(todo => ({
    ...todo,
    user: usersFromServer.find(user => user.id === todo.userId) || null,
  }));

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputTitle(event.target.value);
    setTitleError(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(event.target.value);
    setUserError(false);
  };

  const addToDo = () => {
    if (selectedUser === '-1') {
      setUserError(true);
    }

    if (!inputTitle) {
      setTitleError(true);
    }

    if (selectedUser === '-1' || !inputTitle) {
      return;
    }

    const newToDo = {
      id: Math.max(...listOfToDos.map(toDo => toDo.id)) + 1,
      title: inputTitle,
      completed: false,
      userId: +selectedUser,
    };

    const newList = [...listOfToDos, newToDo];

    setListOfToDos(newList);
    setSelectedUser('-1');
    setInputTitle('');
  };

  return (
    <div className="App">
      <h1 className="App__title">Static list of todos</h1>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          addToDo();
        }}
      >
        <div>
          <input
            data-cy="titleInput"
            placeholder="Enter Title"
            value={inputTitle}
            onChange={(event) => handleTitleChange(event)}
          />

          {titleError && (<span className="error">Please enter a title</span>)}
        </div>

        <div>
          <select
            value={selectedUser}
            onChange={(event) => handleUserChange(event)}
            data-cy="userSelect"
          >
            <option value="-1">
              Choose a user
            </option>

            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {userError && (<span className="error">Please choose a user</span>)}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <TodoList todos={ToDosWithUsers} />
    </div>
  );
};
