import { useState } from 'react';
import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { TodoWithUser } from './types/TodoWithUser';

export const App = () => {
  const combined = todosFromServer.map(todo => {
    const user = usersFromServer.find(
      userServer => userServer.id === todo.userId,
    );

    return { ...todo, user };
  });

  const [newArr, setTodosFromServer] = useState([...combined]);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [newId, setNewId] = useState(0);
  const [errorTitle, setErrorTitle] = useState(false);
  const [errorUser, setErrorUser] = useState(false);

  const handleAddTodo = () => {
    if (newTodoTitle === '') {
      setErrorTitle(true);
    }

    if (newId === 0) {
      setErrorUser(true);
    }

    if (newTodoTitle === '' || newId === 0) {
      return;
    }

    const newTodo: TodoWithUser = {
      id: todosFromServer.length + 1,
      title: newTodoTitle,
      completed: false,
      userId: newId,
      user: {
        email: usersFromServer[newId - 1].email,
        id: newId,
        name: usersFromServer[newId - 1].name,
        username: usersFromServer[newId - 1].username,
      },
    };

    setTodosFromServer([...newArr, newTodo]);
    setNewTodoTitle('');
    setErrorTitle(false);
    setErrorUser(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        onSubmit={event => {
          event.preventDefault();
        }}
      >
        <div className="field">
          <span>Title:</span>
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={newTodoTitle}
            onChange={(e) => setNewTodoTitle(e.target.value)}
          />
          {(newTodoTitle === '' && errorTitle)
            && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <span>User:</span>
          <select
            data-cy="userSelect"
            id="mySelect"
            onChange={(e) => {
              return (setNewId(+e.target.value), setErrorUser(false));
            }}
          >
            <option value="0" key="0" disabled selected>Choose a user</option>
            {usersFromServer.map(user => (
              <option
                value={user.id}
                key={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>
          {(errorUser)
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

      <TodoList todos={newArr} />
    </div>
  );
};
