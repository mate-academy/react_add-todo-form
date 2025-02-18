import { useState } from 'react';
import './App.scss';

import { TodoList } from './components/TodoList/TodoList';
import todosList from './api/todos';
import users from './api/users';

function getUserById(userId: number) {
  return users.find(user => user.id === userId) || null;
}

export const todos = todosList.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [todoTitle, setTodoTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [listOfTodos, setListOfTodos] = useState(todos);
  const [userError, setUserError] = useState('');
  const [titleError, setTitleError] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!todoTitle || todoTitle === '') {
      setTitleError('Please enter a title');

      return;
    }

    if (!selectedUser || selectedUser === '0') {
      setUserError('Please choose a user');

      return;
    }

    const findUser = users.filter(user => user.id === +selectedUser);

    setIsCompleted(false);

    const newId =
      todos.length > 0
        ? todos.reduce((maxId, todo) => Math.max(todo.id, maxId), 0) + 1
        : 1;

    const newTodo = {
      id: newId,
      title: todoTitle,
      completed: isCompleted,
      userId: +selectedUser,
      user: {
        id: findUser[0].id,
        name: findUser[0].name,
        username: findUser[0].username,
        email: findUser[0].email,
      },
    };

    setListOfTodos(prevTodos => [...prevTodos, newTodo]);

    setTodoTitle('');
    setSelectedUser('');
  };

  return (
    <div>
      <div className="App">
        <h1>Add todo form</h1>

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="titleInput">Please enter a title</label>
            <input
              id="titleInput"
              type="text"
              data-cy="titleInput"
              value={todoTitle}
              onChange={e => {
                setTodoTitle(e.target.value);
                setTitleError('');
              }}
              placeholder="Enter a title"
            />
            {titleError && <span className="error">{titleError}</span>}
          </div>

          <div className="field">
            <label htmlFor="userSelect">Please choose a user</label>
            <select
              id="userSelect"
              data-cy="userSelect"
              onChange={e => {
                setSelectedUser(e.target.value);
                setUserError('');
              }}
              defaultValue={0}
              value={selectedUser}
            >
              <option value={0}>Choose a user</option>
              {users.map(user => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
            {userError && <span className="error">{userError}</span>}
          </div>

          <button type="submit" data-cy="submitButton">
            Add
          </button>
        </form>

        <div className="App">
          <h1 className="App__title">Static list of todos</h1>
          <div>
            <TodoList todos={listOfTodos} />
          </div>
        </div>
      </div>
    </div>
  );
};
