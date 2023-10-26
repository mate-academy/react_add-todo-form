import { useState } from 'react';
import './App.scss';

import todosFromServer from './api/todos';
import usersFromServer from './api/users';
import { TodoList } from './components/TodoList';

export const App = () => {
  const initialList = todosFromServer;
  const [listOfToDos, setListOfToDos] = useState(initialList);
  const [selected, setSelected] = useState('-1');
  const [selectError, setSelectError] = useState(false);
  const [inputTitle, setInputTitle] = useState('');
  const [titleError, setTitleError] = useState(false);
  const ToDosWithUsers = listOfToDos.map(todo => ({
    ...todo,
    user: usersFromServer.find(user => user.id === todo.userId) || null,
  }));

  const addToDo = () => {
    if (selected === '-1') {
      setSelectError(true);
    }

    if (!inputTitle) {
      setTitleError(true);
    }

    if (selected === '-1' || !inputTitle) {
      return;
    }

    const newToDo = {
      id: Math.max(...listOfToDos.map(toDo => toDo.id)) + 1,
      title: inputTitle,
      completed: false,
      userId: +selected,
    };

    const newList = () => [...listOfToDos, newToDo];

    setListOfToDos(newList);
    setSelected('-1');
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
            onChange={(event) => {
              setInputTitle(event.target.value);
              setTitleError(false);
            }}
          />

          {titleError && (<p>Please enter a title</p>)}
        </div>

        <div>
          <select
            value={selected}
            onChange={(event) => {
              setSelected(event.target.value);
              setSelectError(false);
            }}
            data-cy="userSelect"
          >
            <option key={-1} value="-1">
              Choose a user
            </option>

            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {selectError && (<p>Please choose a user</p>)}
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
