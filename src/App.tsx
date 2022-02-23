import React, { useState } from 'react';
import classNames from 'classnames';
import './App.scss';

import todos from './api/todos';
import users from './api/users';
import { TodoList } from './components/Todolist/TodoList';

import { Todo } from './interfaces/Todo';
// import { UnpreparedTodo } from './interfaces/unpreparedTodo';

const getUserById = (userId: number) => {
  return users.find(user => user.id === userId)
    || null;
};

const preparedTodos: Todo[] = todos.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

const App: React.FC = () => {
  const [todoList, setTodoList] = useState(preparedTodos);

  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);

  // const [username, setUsername] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [selectedUserIdError, setSelectedUserIdError] = useState(false);

  const addTodo = (todoTitle: string, userId: number) => {
    const newTodo = {
      id: todoList.length + 1,
      title: todoTitle,
      userId,
      completed: false,
      user: getUserById(userId),
    };

    setTodoList([...todoList, newTodo]);
  };

  const onFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setTitleError(!title);
    setSelectedUserIdError(!selectedUserId);

    if (title && selectedUserId) {
      addTodo(title, selectedUserId);
      setTitle('');
      setSelectedUserId(0);
    }
  };

  return (
    <div className="App">
      <form onSubmit={onFormSubmit}>
        <input
          type="text"
          placeholder="Title"
          className={titleError ? 'error' : ''}
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
            setTitleError(false);
          }}
        />
        <br />
        {titleError ? 'Please enter title' : ''}
        <br />

        <select
          className={classNames({ error: selectedUserIdError })}
          value={selectedUserId}
          onChange={(event) => {
            setSelectedUserId(+event.target.value);
            setSelectedUserIdError(false);
          }}
        >
          <option value="0" disabled>
            Choose a user
          </option>

          {users.map(user => (
            <option value={user.id} key={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        <br />
        {selectedUserIdError ? 'Please choose user' : ''}
        <br />

        <button type="submit">
          ADD
        </button>
      </form>

      <TodoList todoes={todoList} />
    </div>
  );
};

export default App;
