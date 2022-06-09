import React, { useState } from 'react';
import './App.css';
import { PrepArray } from './react-app-env';
import users from './api/users';
import todos from './api/todos';

const preparedtodos:PrepArray[] = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId || null),
}));

const App: React.FC = () => {
  const [todosCurrent, setTodosCurrent] = useState(preparedtodos);
  const [newtitle, setNewTitle] = useState('');
  const [newUser, setNewUser] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [isUserChoosed, setIsUserChoosed] = useState(false);
  const [isTitleadded, setIsTitleadded] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!newtitle) {
      setIsTitleadded(true);
    }

    if (!newUser) {
      setIsUserChoosed(true);
    }

    if (newtitle && newUser) {
      const newTodo: PrepArray = {
        userId: +newUser,
        id: todosCurrent.length + 1,
        title: newtitle,
        completed,
        user: users.find(user => user.id === newUser),
      };

      setTodosCurrent([...todosCurrent, newTodo]);
    }

    setNewTitle('');
    setNewUser(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newtitle}
          placeholder="add new title"
          onChange={(event) => {
            setNewTitle(event.target.value);
            setIsTitleadded(false);
          }}
        />
        {isTitleadded && (
          <div style={
            {
              border: '4px solid red',
              width: '50vw',
              margin: '0 auto',
            }
          }
          >
            Please, add a title!!!
          </div>
        )}
        <select
          value={newUser}
          onChange={(event) => {
            setNewUser(+event.target.value);
            setIsUserChoosed(false);
          }}
        >
          <option value="0" hidden>Choose a user</option>

          {users.map(user => (
            <option
              key={user.id}
              value={user.id}
            >
              {user.name}
            </option>
          ))}
        </select>
        {isUserChoosed && (
          <div style={
            {
              border: '4px solid red',
              width: '50vw',
              margin: '0 auto',
            }
          }
          >
            Please, choose a user!!!
          </div>
        )}

        <div>
          <input
            type="checkbox"
            name="completed"
            checked={completed}
            onChange={() => setCompleted(!completed)}
          />
          <label htmlFor="completed">Check, if completed</label>
        </div>
        <button
          type="submit"
        >
          Add
        </button>
      </form>
      {todosCurrent.map(item => (
        <div className="App__box" key={item.id}>
          <p className="">
            <span className="App__span">Name: </span>
            {item.user?.name}
          </p>
          <p className="">
            <span className="App__span">Title: </span>
            {item.title}
          </p>
          <p className="">
            <span className="App__span">Id: </span>
            {item.id}
          </p>
          <p className="">
            <span className="App__span">Compleated: </span>
            {`${item.completed}`}
          </p>
        </div>
      ))}

    </div>
  );
};

export default App;
