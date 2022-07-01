import React, { useState } from 'react';
import todos from './api/todos';
import users from './api/users';
import './App.scss';
import { preaparedTodos } from './api/preparedTodos';
import { TodoList } from './components/TodosList/TodoList';
// import todos from './api/todos';
// import users from './api/users';

const App: React.FC = () => {
  const [userId, setUserId] = useState(0);
  const [userIdError, setUserIdError] = useState(false);
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [addedTodos, setAddedTodo] = useState(preaparedTodos);

  const createTodo = () => {
    const newTodo = {
      userId,
      id: todos.length + 1,
      title,
      completed: false,
      user: users.find(u => u.id === userId) || null,
    };

    setAddedTodo([...addedTodos, newTodo]);
    setUserId(0);
    setTitle('');
  };

  return (
    <div className="App">
      <form
        onSubmit={(event) => {
          const arr = title.split('');
          let counter = 0;

          event.preventDefault();
          if (userId === 0) {
            setUserIdError(true);
          }

          if (title === '') {
            setTitleError(true);
          }

          if (title !== '' && userId !== 0) {
            createTodo();
          }

          for (let i = 0; i < arr.length; i += 1) {
            if (!('qwertyuiopasdfghjklzxcvbnmйцукенгшщзхъфывапрролджэячсмитьбю123456789 '.includes(arr[i]))) {
              counter += 1;
            }
          }

          if (counter > 0) {
            setTitleError(true);
          }

          if (counter < 1 && title !== '' && userId !== 0) {
            createTodo();
          }
        }}
      >
        <div>
          <input
            type="text"
            placeholder="What a slave should do?"
            value={title}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setTitle(event.target.value);
              setTitleError(false);
            }}
          />
          {titleError && (
            <span className="error">
              Please enter the title
            </span>
          )}
        </div>

        <div>
          <select
            value={userId}
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
              setUserId(Number(event.target.value));
              setUserIdError(false);
            }}
          >
            <option value="">Choose a user</option>
            {users.map((user) => (
              <option value={user.id} key={user.id}>{user.name}</option>
            ))}
          </select>
          {userIdError && (
            <span className="error">
              Choose your slave!!!
            </span>
          )}
        </div>

        <button type="submit">Add</button>
      </form>

      <TodoList todos={addedTodos} />
    </div>
  );
};

export default App;
