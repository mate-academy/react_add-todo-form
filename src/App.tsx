import './App.scss';
import { FormEvent, useState } from 'react';
import { TodoList } from './components/TodoList';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';

const findUserById = (id :number) => {
  return usersFromServer.find(userToFind => (
    userToFind.id === id));
};

const todosWithUser = todosFromServer.map((todo) => {
  return {
    ...todo,
    user: findUserById(todo.userId),
  };
});

export const App = () => {
  const [toDoList, setToDoList] = useState(todosWithUser);
  const [title, setTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const handleSubmit = (event :FormEvent) => {
    event.preventDefault();
    if (!title) {
      setTitleError(true);
    }

    if (!selectedUserId) {
      setUserError(true);
    }

    const newToDo = {
      id: Math.max(...toDoList.map(todo => todo.id)) + 1,
      title,
      completed: false,
      userId: selectedUserId,
      user: findUserById(selectedUserId),
    };

    if (selectedUserId && title) {
      setToDoList(prevToDos => [...prevToDos, newToDo]);
      setTitle('');
      setSelectedUserId(0);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Please enter a title..."
            value={title}
            onChange={(event) => {
              setTitle(event.target.value.replace(/[^a-zA-Zа-яА-Я\d\s]/g, ''));
              setTitleError(false);
            }}
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={selectedUserId}
            onChange={(event) => {
              setSelectedUserId(+event.target.value);
              setUserError(false);
            }}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {userError && <span className="error">Please choose a user</span>}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <TodoList todos={toDoList} />
    </div>
  );
};
