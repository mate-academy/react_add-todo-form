import React, { useState } from 'react';
import './App.css';
import cn from 'classnames';

import users from './api/users';
import todos from './api/todos';
import { TodoList } from './components/TodoList/TodoList';
import { PreparedTodo } from './app.typedef';

const preparedTodos: PreparedTodo[] = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId) || null,
}));

const App: React.FC = () => {
  const [todosList, setTodosList] = useState([...preparedTodos]);
  const [todoTitle, setTodoTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState(0);
  const [titleInputError, setTitleInputError] = useState(false);
  const [userInputError, setUserInputError] = useState(false);

  const addtodo = (title: string, userId: number) => {
    const newTodo: PreparedTodo = {
      userId,
      id: todosList.length + 1,
      title,
      completed: false,
      user: users.find(user => userId === user.id) || null,
    };

    setTodosList([...todosList, newTodo]);
  };

  const clearForm = () => {
    setSelectedUser(0);
    setTodoTitle('');
  };

  const validateInputs = () => {
    if (!todoTitle) {
      setTitleInputError(true);
    }

    if (!selectedUser) {
      setUserInputError(true);
    }
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    validateInputs();

    if (todoTitle && selectedUser) {
      addtodo(todoTitle, selectedUser);
      clearForm();
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <form
        onSubmit={handleFormSubmit}
      >
        <label htmlFor="todoTitle">
          <div>
            <input
              type="text"
              name="title"
              data-cy="titleInput"
              placeholder="Please add task"
              value={todoTitle}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setTitleInputError(false);
                setTodoTitle(event.target.value);
              }}
              className={cn({ error: titleInputError })}
            />

            {titleInputError && (
              <span>Please enter the title</span>
            )}
          </div>
        </label>

        <label htmlFor="userName">
          <div>
            <select
              value={selectedUser}
              onChange={(event) => {
                setUserInputError(false);
                setSelectedUser(Number(event.target.value));
              }}
              className={cn({ error: userInputError })}
            >
              <option value="0" disabled>
                Select user
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

            {userInputError && (
              <span>Please select a user</span>
            )}
          </div>
        </label>

        <div>
          <button type="submit">
            Add todo
          </button>
        </div>

      </form>
      <TodoList preparedTodos={todosList} />
    </div>
  );
};

export default App;
