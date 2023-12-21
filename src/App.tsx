import { useState } from 'react';
import './App.scss';
import { ToDoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

export const App = () => {
  const [title, setTitle] = useState('');
  const [user, setUser] = useState(0);
  const [isTitleHasMistake, setIsTitleHasMistake] = useState(false);
  const [isSelectHasMistake, setIsSelectHasMistake] = useState(false);
  const [toDoLists, setToDoLists] = useState(todosFromServer);

  let maxId = Math.max(...toDoLists.map(item => item.id));

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUser(+event.target.value);
  };

  const handleAddTodo = () => {
    if (!title || !title.trim()) {
      setIsTitleHasMistake(true);
    }

    if (user === 0) {
      setIsSelectHasMistake(true);
    }
  };

  const reset = () => {
    setTitle('');
    setUser(0);
  };

  const addNewToDo = (userId: number) => {
    const newToDo = {
      id: maxId += 1,
      title,
      completed: false,
      userId,
    };

    setToDoLists((prev) => [...prev, newToDo]);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (isTitleHasMistake || isSelectHasMistake) {
      return;
    }

    addNewToDo(user);
    reset();
  };

  const findUser = (id: number) => {
    return usersFromServer.find(perosn => perosn.id === id);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
              setIsTitleHasMistake(false);
            }}
            placeholder="Enter a title"
          />
          {isTitleHasMistake
          && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={user}
            onChange={(event) => {
              handleUserChange(event);
              setIsSelectHasMistake(false);
            }}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map((item) => (
              <option value={item.id} key={item.id}>{item.name}</option>
            ))}
          </select>

          {isSelectHasMistake
           && <span className="error">Please choose a user</span>}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
          onClick={handleAddTodo}
        >
          Add
        </button>
      </form>
      <ToDoList toDoLists={toDoLists} findUser={findUser} />
    </div>
  );
};
