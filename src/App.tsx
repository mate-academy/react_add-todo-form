import React, { FormEvent, useState } from 'react';
import todosFromServer from './api/todos';
import usersFromServer from './api/users';
import './App.css';
import { TodoList } from './Components/TodoList/TodoList';
import { FullTodo, Todo, User } from './react-app-env';

const preparedTodos = (
  todos: Todo[],
  users: User[],
): FullTodo[] => {
  return todos.map(todo => ({
    ...todo,
    user: users.find(user => user.id === todo.userId) || null,
  }));
};

const App: React.FC = () => {
  const [todoItems, setTodoItems] = useState(todosFromServer);
  const [title, setTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [isUser, setIsUser] = useState(true);
  const [isTitle, setIsTitle] = useState(true);
  const [isChecked, setIsChecked] = useState(false);

  const isFormValid = () => {
    if (!selectedUser) {
      setIsUser(false);
    }

    if (!title) {
      setIsTitle(false);
    }

    if (!selectedUser || !title) {
      return false;
    }

    return true;
  };

  const titleHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;

    setTitle(value);
    setIsTitle(true);
  };

  const userHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setSelectedUser(value);
    setIsUser(true);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isFormValid()) {
      const newTodo = {
        userId: Number(selectedUser),
        id: todoItems.length + 1,
        title,
        completed: isChecked,
      };

      setTodoItems([...todoItems, newTodo]);
      setTitle('');
      setSelectedUser('');
      setIsChecked(false);
    }
  };

  const todos = preparedTodos(todoItems, usersFromServer);

  return (
    <div className="App">
      <form onSubmit={onSubmit} className="form">
        <div className="mb-3">
          <select
            name="selectedUser"
            value={selectedUser}
            onChange={userHandler}
            className="form-select"
          >
            <option value="">Choose a user</option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
        {!isUser
        && (
          <div style={{ color: 'red' }}>
            Please choose a user
          </div>
        )}
        <div className="mb-3">
          <input
            type="text"
            name="title"
            value={title}
            onChange={titleHandler}
            placeholder="Enter a new task"
            className="form-control"
          />
        </div>
        {!isTitle
        && (
          <div style={{ color: 'red' }}>
            Please enter the title
          </div>
        )}
        <div className="mb-3 form-check form-switch">
          <label className="form-check-label">
            <input
              type="checkbox"
              name="checkbox"
              checked={isChecked}
              onChange={() => setIsChecked(!isChecked)}
              className="form-check-input"
            />
            Completed
          </label>
        </div>
        <button
          type="submit"
          className="btn btn-primary"
        >
          Add
        </button>
      </form>
      <TodoList todos={todos} />
    </div>
  );
};

export default App;
