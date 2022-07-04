import React, { useState } from 'react';
import './App.css';
import { TodoList } from './components/TodoList';
import { PreparedTodo, User } from './app.typedefs';
import todos from './api/todos';
import users from './api/users';

const findUser = (userId: number):User | undefined => {
  const selectedUser = users.find(user => user.id === userId);

  return selectedUser;
};

const preparedTodos: PreparedTodo[] = todos.map(todo => ({
  ...todo,
  user: findUser(todo.userId),
}));

const App: React.FC = () => {
  const [todosList, setTodos] = useState(preparedTodos);
  const [todosTitle, setTodosTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState(0);
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const addTodo = (title: string, userId: number) => {
    const todo: PreparedTodo = {
      userId,
      id: todosList.length + 1,
      title,
      completed: false,
      user: findUser(userId),
    };

    setTodos([...todosList, todo]);
  };

  const handleSubmit = (event: React.FormEvent):void => {
    event.preventDefault();

    if (!selectedUser) {
      setUserError(true);
    }

    if (!todosTitle) {
      setTitleError(true);
    }

    if (todosTitle && selectedUser) {
      addTodo(todosTitle, selectedUser);
      setTodosTitle('');
      setSelectedUser(0);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <form
        onSubmit={handleSubmit}
      >

        <div>
          <input
            type="text"
            name="title"
            data-cy="titleInput"
            placeholder="Add task title"
            value={todosTitle}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setTitleError(false);
              setTodosTitle(event.target.value);
            }}
          />

          {titleError && (
            <span> Enter the title</span>
          )}
        </div>

        <div>
          <select
            value={selectedUser}
            onChange={(event) => {
              setUserError(false);
              setSelectedUser(Number(event.target.value));
            }}
          >
            <option value="0" disabled>
              Choose a user
            </option>

            {users.map(user => (
              <option
                value={user.id}
                key={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>

          {userError && (
            <span> Choose a user</span>
          )}
        </div>

        <div>
          <button type="submit">
            ADD
          </button>
        </div>

      </form>
      <TodoList preparedTodos={todosList} />
    </div>
  );
};

export default App;
