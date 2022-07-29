import { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList/TodoList';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { List } from './types/List';

let list: List[] = [...todosFromServer].map(todo => {
  const person = usersFromServer
    .find(user => user.id === todo.userId) || null;

  return { ...todo, person };
});

export const App:React.FC = () => {
  const [title, setTitle] = useState('');
  const [user, setUser] = useState('Please choose a user');
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (title === '' || user === 'Please choose a user') {
      if (title === '') {
        setTitleError(true);
      }

      if (user === 'Please choose a user') {
        setUserError(true);
      }

      return;
    }

    const sortedList = [...list].sort((a, b) => a.id - b.id);
    const id = sortedList[sortedList.length - 1].id + 1;
    const person = usersFromServer
      .find(pers => pers.name === user) || null;

    const userId = usersFromServer
      .find(pers => pers.name === user)?.id || null;

    const newTodo: List = {
      id,
      title,
      completed: false,
      userId,
      person,
    };

    list = [...list, newTodo];

    setTitle('');
    setUser('Please choose a user');
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div className="field">
          <input
            type="text"
            placeholder="Enter title"
            data-cy="titleInput"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setTitle(e.target.value);
              setTitleError(false);
            }}
            value={title}
          />
          {
            titleError && (
              <span className="error">Please enter a title</span>
            )
          }

        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            onChange={(e) => {
              setUser(e.target.value);
              setUserError(false);
            }}
            value={user}
          >
            <option
              value="Please choose a user"
              key="-1"
              disabled
            >
              Please choose a user
            </option>
            {
              usersFromServer.map(element => (
                <option
                  value={element.name}
                  key={element.id}
                >
                  {element.name}
                </option>
              ))
            }
          </select>
          {
            userError && (
              <span className="error">Please choose a user</span>
            )
          }
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList list={list} />
    </div>
  );
};
